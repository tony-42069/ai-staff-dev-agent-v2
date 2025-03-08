import os
from datetime import timedelta

# Application settings
APP_NAME = "AI Staff Development Agent"
APP_VERSION = "0.1.0"
API_PREFIX = "/api"

# Authentication settings
SECRET_KEY = os.getenv("SECRET_KEY", "temporarysecretkeyforthisproject")  # In production, set this as an environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_DAYS = 7  # 7 days

# Database settings
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "aistaff.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

# CORS settings
CORS_ORIGINS = [
    "http://localhost:3000",  # Frontend dev server
    "http://localhost:5173",  # Vite dev server
]
