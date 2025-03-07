import React from 'react';
import { 
  Box, 
  Heading, 
  Text,
  Skeleton,
  useColorModeValue,
  HStack,
  Progress,
  Flex,
  Badge
} from '@chakra-ui/react';
import { DashboardStats } from '../../hooks/useDashboard';

interface AgentStatusWidgetProps {
  stats: DashboardStats;
  loading: boolean;
}

const AgentStatusWidget: React.FC<AgentStatusWidgetProps> = ({ stats, loading }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Assume we have 5 types of capabilities
  const capabilities = [
    { name: 'text_processing', agents: 4, color: 'blue' },
    { name: 'data_analysis', agents: 3, color: 'green' },
    { name: 'customer_service', agents: 2, color: 'purple' },
    { name: 'code_generation', agents: 1, color: 'pink' },
    { name: 'automation', agents: 3, color: 'orange' }
  ];
  
  // Calculate total to get percentages
  const totalCapabilities = capabilities.reduce((sum, cap) => sum + cap.agents, 0);
  
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
      <Heading size="md" mb={4}>Agent Status</Heading>
      
      {loading ? (
        <Skeleton height="150px" />
      ) : (
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">Capabilities Distribution</Text>
            <Badge colorScheme={stats.activeAgents > 0 ? "green" : "red"}>
              {stats.activeAgents > 0 ? "Active" : "No Active Agents"}
            </Badge>
          </HStack>
          
          {capabilities.map((capability, idx) => (
            <Box key={idx} mb={3}>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm" textTransform="capitalize">
                  {capability.name.replace('_', ' ')}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {capability.agents}
                </Text>
              </Flex>
              <Progress 
                value={(capability.agents / totalCapabilities) * 100} 
                size="sm" 
                colorScheme={capability.color as any}
                borderRadius="full"
              />
            </Box>
          ))}
          
          <Text fontSize="xs" mt={4} color="gray.500">
            Distribution of capabilities across all agents
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default AgentStatusWidget;
