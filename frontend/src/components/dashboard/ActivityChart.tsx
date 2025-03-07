import React from 'react';
import { 
  Box, 
  Heading, 
  Text,
  Skeleton,
  useColorModeValue,
  HStack,
  VStack,
  Divider,
  Badge
} from '@chakra-ui/react';
import { ActivityData } from '../../hooks/useDashboard';

interface ActivityChartProps {
  data: ActivityData[];
  loading: boolean;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, loading }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Find max values for scaling
  const maxAgents = Math.max(...data.map(d => d.agents));
  const maxTasks = Math.max(...data.map(d => d.tasks));
  
  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="md"
      bg={bgColor}
      borderColor={borderColor}
    >
      <Heading size="md" mb={4}>Agent Activity</Heading>
      
      {loading ? (
        <Skeleton height="200px" />
      ) : (
        <Box>
          <HStack mb={4} spacing={4}>
            <Badge colorScheme="blue" px={2} py={1}>Agents</Badge>
            <Badge colorScheme="green" px={2} py={1}>Tasks</Badge>
          </HStack>
          
          {/* Simple chart visualization */}
          <Box position="relative" height="200px" mt={4}>
            <HStack spacing={0} height="100%" justify="space-between">
              {data.map((item, index) => (
                <VStack key={index} height="100%" justify="flex-end" flex="1">
                  {/* Agent bar */}
                  <Box
                    width="50%" 
                    bg="blue.400"
                    height={`${(item.agents / maxAgents) * 80}%`}
                    minHeight="4px"
                    borderTopRadius="md"
                  />
                  
                  {/* Task bar */}
                  <Box
                    width="50%"
                    bg="green.400"
                    height={`${(item.tasks / maxTasks) * 80}%`}
                    minHeight="4px"
                    borderTopRadius="md"
                    position="absolute"
                    bottom="0"
                    left={`${(index * 100) / data.length + 8}%`}
                  />
                  
                  {/* Date label */}
                  <Text 
                    fontSize="xs" 
                    position="absolute"
                    bottom="-25px"
                    left={`${(index * 100) / data.length + 8}%`}
                    transform="translateX(-50%)"
                  >
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </VStack>
              ))}
            </HStack>
            
            {/* Horizontal axis line */}
            <Divider position="absolute" bottom="0" width="100%" />
          </Box>
          
          <Text fontSize="sm" mt={8} textAlign="center" color="gray.500">
            This chart shows the growth of agents and tasks over time
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ActivityChart;
