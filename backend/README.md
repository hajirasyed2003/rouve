# ROUVÉ backend

FastAPI service. Setup, commands and architecture are documented in
[`../docs/project-setup.md`](../docs/project-setup.md).

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000   # http://localhost:8000/api/v1/docs
pytest
```
