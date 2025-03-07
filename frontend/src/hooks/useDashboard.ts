import { useState, useEffect } from 'react';
import agentService from '../services/agents';
import marketplaceService from '../services/marketplace';

export interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  marketplaceListings: number;
}

export interface ActivityData {
  date: string;
  agents: number;
  tasks: number;
}

export default function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 0,
    activeAgents: 0,
    marketplaceListings: 0,
  });
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch agents
        const agents = await agentService.getAgents();
        
        // Fetch marketplace listings
        const listings = await marketplaceService.getListings();
        
        // Update stats
        setStats({
          totalAgents: agents.length,
          activeAgents: agents.filter(a => a.status === 'active').length,
          marketplaceListings: listings.length,
        });
        
        // Mock activity data
        setActivities(generateMockActivityData());
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return { stats, activities, loading, error };
}

// Helper function to generate mock activity data
function generateMockActivityData(): ActivityData[] {
  return [
    { date: '2025-03-01', agents: 5, tasks: 12 },
    { date: '2025-03-02', agents: 6, tasks: 15 },
    { date: '2025-03-03', agents: 8, tasks: 20 },
    { date: '2025-03-04', agents: 10, tasks: 25 },
    { date: '2025-03-05', agents: 12, tasks: 30 },
    { date: '2025-03-06', agents: 15, tasks: 40 },
  ];
}
