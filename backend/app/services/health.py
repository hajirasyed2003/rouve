import asyncio

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

from app.schemas.health import DatabaseState


async def check_database(engine: AsyncEngine | None, timeout: float = 3.0) -> DatabaseState:
    """Run SELECT 1 with a timeout. Never raises; returns a state for the readiness probe."""
    if engine is None:
        return "not_configured"
    try:
        async with asyncio.timeout(timeout):
            async with engine.connect() as connection:
                await connection.execute(text("SELECT 1"))
        return "ok"
    except Exception:  # noqa: BLE001 - any failure means "not ready"
        return "unreachable"
