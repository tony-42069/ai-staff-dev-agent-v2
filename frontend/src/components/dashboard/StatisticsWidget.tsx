import React from 'react';
import { 
  Box, 
  Heading, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatGroup, 
  Skeleton,
  useColorModeValue
} from '@chakra-ui/react';
import { DashboardStats } from '../../hooks/useDashboard';

interface StatisticsWidgetProps {
  stats: DashboardStats;
  loading: boolean;
}

const StatisticsWidget: React.FC<StatisticsWidgetProps> = ({ stats, loading }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="md" 
      bg={bgColor}
      borderColor={borderColor}
      height="100%"
    >
      <Heading size="md" mb={4}>System Statistics</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Agents</StatLabel>
          {loading ? (
            <Skeleton height="24px" width="40px" />
          ) : (
            <StatNumber>{stats.totalAgents}</StatNumber>
          )}
        </Stat>
        
        <Stat>
          <StatLabel>Active Agents</StatLabel>
          {loading ? (
            <Skeleton height="24px" width="40px" />
          ) : (
            <StatNumber>{stats.activeAgents}</StatNumber>
          )}
        </Stat>
        
        <Stat>
          <StatLabel>Marketplace</StatLabel>
          {loading ? (
            <Skeleton height="24px" width="40px" />
          ) : (
            <StatNumber>{stats.marketplaceListings}</StatNumber>
          )}
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default StatisticsWidget;
