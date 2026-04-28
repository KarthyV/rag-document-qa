from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import query, upload


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(
    query.router,
    prefix="/api/query",
)

app.include_router(
    upload.router,
    prefix="/api/upload",
)

@app.get('/health')
async def healthCheck():
    return {"status": "ok"}

