from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import uvicorn
from sqlalchemy.orm import Session

from backend.db.models import create_tables, get_db
from backend.api import agents, marketplace, auth
from backend.config import CORS_ORIGINS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="AI Staff Development Agent",
    description="API for creating and managing AI agents for staffing",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(marketplace.router, prefix="/api", tags=["marketplace"])

# Health check endpoint
@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "healthy", "service": "ai-staff-dev-agent"}

# Root endpoint
@app.get("/", tags=["root"])
async def root():
    return {
        "message": "Welcome to AI Staff Development Agent API",
        "docs_url": "/docs",
        "version": "0.1.0"
    }

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    logger.info("Starting AI Staff Development Agent API")
    create_tables()
    logger.info("Database tables created")

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
