import json
import logging
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
import json

from backend.db.models import Agent
from backend.core.factory import agent_factory

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AgentService:
    """
    Service class for agent-related business logic
    """
    
    def create_agent(self, db: Session, agent_data) -> Agent:
        """Create a new agent in the database"""
        
        # Use the agent factory to create the agent config
        agent_config = agent_factory.create_agent(
            name=agent_data.name,
            description=agent_data.description,
            capabilities=agent_data.capabilities
        )
        
        # Create DB model instance
        db_agent = Agent(
            name=agent_config["name"],
            description=agent_config["description"],
            capabilities=json.dumps(agent_config["capabilities"]),
            status=agent_config["status"]
        )
        
        # Save to database
        db.add(db_agent)
        db.commit()
        db.refresh(db_agent)
        
        logger.info(f"Created agent in database: {db_agent.id} - {db_agent.name}")
        return db_agent
    
    def get_agents(self, db: Session) -> List[Agent]:
        """Get all agents from the database"""
        return db.query(Agent).filter(Agent.is_active == True).all()
    
    def get_agent(self, db: Session, agent_id: int) -> Optional[Agent]:
        """Get a specific agent by ID"""
        return db.query(Agent).filter(Agent.id == agent_id, Agent.is_active == True).first()
    
    def delete_agent(self, db: Session, agent_id: int) -> bool:
        """
        Delete an agent by ID (soft delete)
        
        Returns:
            bool: True if deleted, False if not found
        """
        agent = db.query(Agent).filter(Agent.id == agent_id, Agent.is_active == True).first()
        if not agent:
            return False
        
        # Soft delete
        agent.is_active = False
        db.commit()
        
        logger.info(f"Deleted agent: {agent_id}")
        return True
    
    def get_available_capabilities(self) -> List[str]:
        """Get list of available capabilities for agents"""
        return agent_factory.get_available_capabilities()
