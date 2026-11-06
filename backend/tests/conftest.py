import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


def make_settings(**overrides) -> Settings:
    base = {"app_env": "test", "database_url": None, "cors_origins": "http://localhost:3000"}
    base.update(overrides)
    # _env_file=None: tests must never read a developer's real .env
    return Settings(_env_file=None, **base)


@pytest.fixture
def settings() -> Settings:
    return make_settings()


@pytest.fixture
def client(settings: Settings):
    # raise_server_exceptions=False lets us assert on the 500 envelope.
    with TestClient(create_app(settings), raise_server_exceptions=False) as test_client:
        yield test_client
