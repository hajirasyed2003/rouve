import re

from fastapi import APIRouter, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from sqlalchemy import text

from app.core.errors import AppError
from app.db.session import get_db_session
from app.main import create_app
from tests.conftest import make_settings


class _Payload(BaseModel):
    quantity: int


def _app_with_probe_routes():
    app = create_app(make_settings(database_url="sqlite+aiosqlite://"))
    router = APIRouter()

    @router.get("/_probe/boom")
    async def boom():
        raise RuntimeError("secret internal detail")

    @router.get("/_probe/app-error")
    async def app_error():
        raise AppError("Nope.", details={"field": "x"})

    @router.post("/_probe/validate")
    async def validate(payload: _Payload):
        return payload

    @router.get("/_probe/session")
    async def session(db=Depends(get_db_session)):
        return {"value": (await db.execute(text("SELECT 41 + 1"))).scalar_one()}

    app.include_router(router)
    return app


def test_unknown_route_uses_error_envelope(client):
    response = client.get("/api/v1/nope")
    assert response.status_code == 404
    error = response.json()["error"]
    assert error["code"] == "not_found"
    assert error["request_id"]


def test_wrong_method_is_405_envelope(client):
    response = client.post("/api/v1/health")
    assert response.status_code == 405
    assert response.json()["error"]["code"] == "method_not_allowed"


def test_validation_errors_do_not_echo_input():
    with TestClient(_app_with_probe_routes()) as client:
        response = client.post("/_probe/validate", json={"quantity": "not-a-number-SECRET"})
    assert response.status_code == 422
    body = response.json()
    assert body["error"]["code"] == "validation_error"
    assert "SECRET" not in response.text


def test_app_errors_carry_status_code_and_details():
    with TestClient(_app_with_probe_routes()) as client:
        response = client.get("/_probe/app-error")
    assert response.status_code == 400
    assert response.json()["error"]["details"] == {"field": "x"}


def test_unhandled_errors_are_generic_and_leak_nothing():
    with TestClient(_app_with_probe_routes(), raise_server_exceptions=False) as client:
        response = client.get("/_probe/boom")
    assert response.status_code == 500
    assert response.json()["error"]["code"] == "internal_error"
    assert "secret internal detail" not in response.text


def test_database_session_dependency_works_when_configured():
    with TestClient(_app_with_probe_routes()) as client:
        assert client.get("/_probe/session").json() == {"value": 42}


def test_database_session_dependency_reports_not_configured(client):
    app = client.app
    router = APIRouter()

    @router.get("/_probe/session")
    async def session(db=Depends(get_db_session)):
        return {}

    app.include_router(router)
    response = client.get("/_probe/session")
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "database_not_configured"


def test_request_id_is_generated_and_safe_ids_are_echoed(client):
    generated = client.get("/api/v1/health").headers["x-request-id"]
    assert re.fullmatch(r"[0-9a-f]{32}", generated)
    assert (
        client.get("/api/v1/health", headers={"X-Request-ID": "abc-12345"}).headers["x-request-id"]
        == "abc-12345"
    )
    # Unsafe values are replaced, preventing log injection.
    unsafe = client.get("/api/v1/health", headers={"X-Request-ID": "bad id\nwith newline"})
    assert unsafe.headers["x-request-id"] != "bad id\nwith newline"
