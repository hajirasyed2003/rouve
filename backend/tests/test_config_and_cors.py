import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app
from tests.conftest import make_settings


def test_cors_origins_parse_from_comma_separated_env(monkeypatch):
    monkeypatch.setenv("CORS_ORIGINS", "http://localhost:3000, https://rouve.example/ ,")
    settings = Settings(_env_file=None)
    assert settings.cors_origins == ["http://localhost:3000", "https://rouve.example"]


def test_wildcard_cors_origin_is_rejected():
    with pytest.raises(ValueError):
        Settings(_env_file=None, cors_origins="*")


@pytest.mark.parametrize("raw", ["postgresql://u:p@h:5432/db", "postgres://u:p@h:5432/db"])
def test_database_url_is_switched_to_asyncpg(raw):
    assert Settings(_env_file=None, database_url=raw).database_url == "postgresql+asyncpg://u:p@h:5432/db"


def test_blank_database_url_means_not_configured(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "")
    assert Settings(_env_file=None).database_url is None


def test_secrets_are_not_exposed_in_repr():
    settings = Settings(_env_file=None, razorpay_key_secret="super-secret-value")
    assert "super-secret-value" not in repr(settings)


def test_allowed_origin_gets_cors_headers(client):
    response = client.get("/api/v1/health", headers={"Origin": "http://localhost:3000"})
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
    assert response.headers["access-control-allow-credentials"] == "true"


def test_unlisted_origin_gets_no_cors_headers(client):
    response = client.get("/api/v1/health", headers={"Origin": "https://evil.example"})
    assert "access-control-allow-origin" not in response.headers


def test_preflight_for_allowed_origin(client):
    response = client.options(
        "/api/v1/health",
        headers={"Origin": "http://localhost:3000", "Access-Control-Request-Method": "GET"},
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"


def test_openapi_docs_available_outside_production(client):
    assert client.get("/api/v1/openapi.json").status_code == 200
    assert client.get("/api/v1/docs").status_code == 200


def test_openapi_docs_disabled_in_production():
    settings = make_settings(app_env="production")
    with TestClient(create_app(settings)) as client:
        assert client.get("/api/v1/openapi.json").status_code == 404
        assert client.get("/api/v1/docs").status_code == 404
