import { useState, useEffect, useCallback } from 'react';
import agentService, { Agent, CreateAgentDto } from '../services/agents';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<string[]>([]);

  // Fetch all agents
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getAgents();
      setAgents(data);
    } catch (err) {
      console.error('Error fetching agents:', err);
      setError('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a specific agent by ID
  const getAgent = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const agent = await agentService.getAgent(id);
      return agent;
    } catch (err) {
      console.error(`Error fetching agent ${id}:`, err);
      setError(`Failed to fetch agent ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new agent
  const createAgent = useCallback(async (agent: CreateAgentDto) => {
    setLoading(true);
    setError(null);
    try {
      const newAgent = await agentService.createAgent(agent);
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (err) {
      console.error('Error creating agent:', err);
      setError('Failed to create agent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete an agent
  const deleteAgent = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await agentService.deleteAgent(id);
      setAgents(prev => prev.filter(agent => agent.id !== id));
      return true;
    } catch (err) {
      console.error(`Error deleting agent ${id}:`, err);
      setError(`Failed to delete agent ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available capabilities
  const fetchCapabilities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getAvailableCapabilities();
      setCapabilities(data);
    } catch (err) {
      console.error('Error fetching capabilities:', err);
      setError('Failed to fetch capabilities');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch agents and capabilities on component mount
  useEffect(() => {
    fetchAgents();
    fetchCapabilities();
  }, [fetchAgents, fetchCapabilities]);

  return {
    agents,
    capabilities,
    loading,
    error,
    fetchAgents,
    getAgent,
    createAgent,
    deleteAgent,
    fetchCapabilities
  };
}

export default useAgents;
