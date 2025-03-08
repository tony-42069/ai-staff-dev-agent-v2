import json
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime

from backend.core.intelligence import intelligence_engine

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AgentFactory:
    """
    Factory class for creating and configuring AI agents.
    This is a simplified version for the emergency implementation.
    """
    
    def __init__(self):
        logger.info("Initializing Agent Factory")
        self.available_capabilities = intelligence_engine.get_available_capabilities()
    
    def create_agent(self, name: str, description: Optional[str] = None, 
                    capabilities: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Create a new agent with the specified configuration
        
        Args:
            name: Name of the agent
            description: Description of the agent's function
            capabilities: List of capability names the agent should have
            
        Returns:
            Dictionary with agent configuration
        """
        # Validate capabilities
        valid_capabilities = []
        if capabilities:
            for cap in capabilities:
                if cap in self.available_capabilities:
                    valid_capabilities.append(cap)
                else:
                    logger.warning(f"Ignoring unknown capability: {cap}")
        
        # Create agent config
        agent_config = {
            "name": name,
            "description": description or "",
            "capabilities": valid_capabilities,
            "created_at": datetime.utcnow().isoformat(),
            "status": "inactive"
        }
        
        logger.info(f"Created agent: {name} with {len(valid_capabilities)} capabilities")
        return agent_config
    
    def get_available_capabilities(self) -> List[str]:
        """Get list of available capabilities for agents"""
        return self.available_capabilities
    
    def validate_agent_config(self, agent_config: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate an agent configuration
        
        Args:
            agent_config: Agent configuration dictionary
            
        Returns:
            Dictionary with validation results
        """
        errors = []
        
        # Check required fields
        if not agent_config.get("name"):
            errors.append("Agent name is required")
        
        # Validate capabilities
        capabilities = agent_config.get("capabilities", [])
        invalid_capabilities = [cap for cap in capabilities if cap not in self.available_capabilities]
        if invalid_capabilities:
            errors.append(f"Invalid capabilities: {', '.join(invalid_capabilities)}")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors
        }

# Create singleton instance
agent_factory = AgentFactory()
