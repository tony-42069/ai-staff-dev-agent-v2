import api from './api';

export interface Agent {
  id: number;
  name: string;
  description: string;
  capabilities: string[];
  status: string;
  created_at: string;
}

export interface CreateAgentDto {
  name: string;
  description?: string;
  capabilities?: string[];
}

class AgentService {
  async getAgents(): Promise<Agent[]> {
    const response = await api.get('/agents');
    return response.data;
  }

  async getAgent(id: number): Promise<Agent> {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  }

  async createAgent(agent: CreateAgentDto): Promise<Agent> {
    const response = await api.post('/agents', agent);
    return response.data;
  }

  async deleteAgent(id: number): Promise<void> {
    await api.delete(`/agents/${id}`);
  }

  async getAvailableCapabilities(): Promise<string[]> {
    const response = await api.get('/agents/capabilities/available');
    return response.data;
  }
}

export default new AgentService();
