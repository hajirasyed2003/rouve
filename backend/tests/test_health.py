from fastapi.testclient import TestClient

from app.main import create_app
from tests.conftest import make_settings


def test_liveness_returns_ok_without_database(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "ROUVÉ API"
    assert body["environment"] == "test"
    assert body["version"]


def test_versioned_prefix_only(client):
    assert client.get("/health").status_code == 404


def test_readiness_reports_database_not_configured(client):
    response = client.get("/api/v1/health/ready")
    assert response.status_code == 503
    assert response.json() == {"status": "unavailable", "database": "not_configured"}


def test_readiness_reports_unreachable_database():
    # Port 1 refuses connections immediately: a deterministic "unreachable" without a real server.
    settings = make_settings(database_url="postgresql://user:pw@127.0.0.1:1/rouve")
    with TestClient(create_app(settings)) as client:
        response = client.get("/api/v1/health/ready")
    assert response.status_code == 503
    assert response.json() == {"status": "unavailable", "database": "unreachable"}


def test_readiness_ok_with_working_database():
    # An in-memory SQLite engine stands in for a reachable database to exercise the success path.
    settings = make_settings(database_url="sqlite+aiosqlite://")
    with TestClient(create_app(settings)) as client:
        response = client.get("/api/v1/health/ready")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "ok"}
