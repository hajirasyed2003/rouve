"""ORM models. Import every model module here so Alembic sees it in Base.metadata."""

from app.models.base import Base

__all__ = ["Base"]
