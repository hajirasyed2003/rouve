from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    service: str
    version: str
    environment: str


DatabaseState = Literal["ok", "not_configured", "unreachable"]


class ReadinessResponse(BaseModel):
    status: Literal["ok", "unavailable"]
    database: DatabaseState
