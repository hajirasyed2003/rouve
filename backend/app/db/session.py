"""Database connection architecture (PostgreSQL via SQLAlchemy async + asyncpg).

The engine is created once at application start (see app.main lifespan) and
stored on app.state. When DATABASE_URL is not set, no engine is created and
database-backed endpoints report "not configured" instead of crashing.
"""

from collections.abc import AsyncIterator
from typing import Any

from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import Settings
from app.core.errors import DatabaseNotConfiguredError


def build_engine(settings: Settings) -> AsyncEngine | None:
    if not settings.database_url:
        return None

    connect_args: dict[str, Any] = {}
    kwargs: dict[str, Any] = {}
    if settings.database_url.startswith("postgresql+asyncpg://"):
        kwargs.update(pool_size=settings.db_pool_size, max_overflow=settings.db_max_overflow)
        if settings.db_use_pgbouncer:
            # PgBouncer in transaction mode cannot reuse prepared statements.
            connect_args["statement_cache_size"] = 0
            connect_args["prepared_statement_cache_size"] = 0

    return create_async_engine(
        settings.database_url,
        pool_pre_ping=True,
        connect_args=connect_args,
        **kwargs,
    )


def get_engine(request: Request) -> AsyncEngine | None:
    return request.app.state.engine


async def get_db_session(request: Request) -> AsyncIterator[AsyncSession]:
    """FastAPI dependency yielding one session per request. Rolls back on error."""
    engine: AsyncEngine | None = request.app.state.engine
    if engine is None:
        raise DatabaseNotConfiguredError("The database is not configured.")
    factory = async_sessionmaker(engine, expire_on_commit=False)
    async with factory() as session:
        yield session
