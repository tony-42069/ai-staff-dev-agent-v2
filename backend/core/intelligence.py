import json
import logging
from typing import Dict, List, Any, Optional

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IntelligenceEngine:
    """
    Core intelligence engine for AI Staff agent platform.
    This simplified version just manages basic agent capabilities.
    """
    
    def __init__(self):
        logger.info("Initializing Intelligence Engine")
        self.capabilities = {
            "text_processing": self._text_processing,
            "data_analysis": self._data_analysis,
            "customer_service": self._customer_service,
            "code_generation": self._code_generation,
            "automation": self._automation,
        }
    
    def _text_processing(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Simple text processing capability"""
        text = input_data.get("text", "")
        return {
            "processed_text": f"Processed: {text}",
            "word_count": len(text.split()),
            "char_count": len(text)
        }
    
    def _data_analysis(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Simple data analysis capability"""
        data = input_data.get("data", [])
        if not data:
            return {"error": "No data provided"}
        
        # Check if all elements are numbers
        if all(isinstance(x, (int, float)) for x in data):
            return {
                "count": len(data),
                "sum": sum(data),
                "average": sum(data) / len(data) if len(data) > 0 else 0
            }
        else:
            return {
                "count": len(data),
                "type": "mixed or non-numeric data"
            }
    
    def _customer_service(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Simple customer service capability"""
        query = input_data.get("query", "")
        return {
            "response": f"Thank you for your query: '{query}'. Our team will assist you shortly."
        }
    
    def _code_generation(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Simple code generation capability"""
        language = input_data.get("language", "python")
        prompt = input_data.get("prompt", "")
        
        # Very simplified code generation (just a template)
        if language == "python":
            code = f"# Generated from: {prompt}\ndef main():\n    print('Hello, AI Staff!')\n\nif __name__ == '__main__':\n    main()"
        else:
            code = f"// Generated from: {prompt}\nfunction main() {{\n    console.log('Hello, AI Staff!');\n}}\n\nmain();"
            
        return {
            "code": code,
            "language": language
        }
    
    def _automation(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Simple automation capability"""
        task = input_data.get("task", "")
        return {
            "result": f"Automated task: {task}",
            "status": "completed"
        }
    
    def execute_capability(self, capability_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a specific capability with the given input data"""
        if capability_name not in self.capabilities:
            return {"error": f"Capability '{capability_name}' not found"}
        
        try:
            return self.capabilities[capability_name](input_data)
        except Exception as e:
            logger.error(f"Error executing capability '{capability_name}': {str(e)}")
            return {"error": f"Error executing capability: {str(e)}"}
    
    def get_available_capabilities(self) -> List[str]:
        """Get list of available capabilities"""
        return list(self.capabilities.keys())
    
    def process_agent_task(self, agent_config: Dict[str, Any], task_input: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a task using an agent's configuration
        
        This is a simplified version that just executes the first matching capability
        """
        agent_capabilities = agent_config.get("capabilities", [])
        if not agent_capabilities:
            return {"error": "Agent has no capabilities configured"}
        
        # Find the first matching capability
        task_type = task_input.get("type", "")
        for capability in agent_capabilities:
            if capability == task_type:
                return self.execute_capability(capability, task_input.get("data", {}))
        
        return {"error": f"No matching capability for task type '{task_type}'"}

# Create singleton instance
intelligence_engine = IntelligenceEngine()
