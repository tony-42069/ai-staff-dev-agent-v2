from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from backend.db.models import get_db
from backend.services.agent_service import AgentService
from pydantic import BaseModel

# Create router
router = APIRouter()

# Define Pydantic models for request/response
class AgentBase(BaseModel):
    name: str
    description: Optional[str] = None
    capabilities: Optional[List[str]] = []

class AgentCreate(AgentBase):
    pass

class AgentResponse(AgentBase):
    id: int
    status: str
    created_at: str
    
    class Config:
        orm_mode = True

# Create agent service instance
agent_service = AgentService()

# Get all agents
@router.get("/", response_model=List[AgentResponse])
async def get_agents(db: Session = Depends(get_db)):
    return agent_service.get_agents(db)

# Get agent by ID
@router.get("/{agent_id}", response_model=AgentResponse)
async def get_agent(agent_id: int, db: Session = Depends(get_db)):
    agent = agent_service.get_agent(db, agent_id)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found"
        )
    return agent

# Create new agent
@router.post("/", response_model=AgentResponse, status_code=status.HTTP_201_CREATED)
async def create_agent(agent: AgentCreate, db: Session = Depends(get_db)):
    return agent_service.create_agent(db, agent)

# Delete agent
@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    success = agent_service.delete_agent(db, agent_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found"
        )
    return None

# Get available capabilities
@router.get("/capabilities/available", response_model=List[str])
async def get_available_capabilities():
    return agent_service.get_available_capabilities()
