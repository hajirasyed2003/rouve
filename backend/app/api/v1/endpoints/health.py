from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncEngine

from app.core.config import Settings
from app.db.session import get_engine
from app.schemas.health import HealthResponse, ReadinessResponse
from app.services.health import check_database

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=HealthResponse, summary="Liveness check")
async def liveness(request: Request) -> HealthResponse:
    """The process is up. Does not touch the database."""
    settings: Settings = request.app.state.settings
    return HealthResponse(
        service=settings.app_name, version=settings.app_version, environment=settings.app_env
    )


@router.get(
    "/ready",
    response_model=ReadinessResponse,
    summary="Readiness check",
    responses={503: {"model": ReadinessResponse, "description": "A dependency is unavailable"}},
)
async def readiness(engine: AsyncEngine | None = Depends(get_engine)) -> JSONResponse:
    """Dependencies are reachable. Currently checks only the PostgreSQL connection."""
    database = await check_database(engine)
    ready = database == "ok"
    body = ReadinessResponse(status="ok" if ready else "unavailable", database=database)
    return JSONResponse(
        status_code=status.HTTP_200_OK if ready else status.HTTP_503_SERVICE_UNAVAILABLE,
        content=body.model_dump(),
    )
