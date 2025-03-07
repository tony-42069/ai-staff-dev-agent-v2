from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, Float, func, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

# Create Base class for declarative models
Base = declarative_base()

class Agent(Base):
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    capabilities = Column(Text, nullable=True)  # JSON string of capabilities
    status = Column(String(20), default="inactive")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, default=0.0)
    author = Column(String(100))
    capabilities = Column(Text, nullable=True)  # JSON string of capabilities
    rating = Column(Float, default=0.0)
    downloads = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Database connection
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "aistaff.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
