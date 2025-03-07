import React from 'react';
import {
  Box,
  Badge,
  Heading,
  Text,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  Flex,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Agent } from '../../services/agents';

interface AgentCardProps {
  agent: Agent;
  onDelete: (id: number) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDelete }) => {
  // Parse capabilities from string if needed
  const capabilities = Array.isArray(agent.capabilities)
    ? agent.capabilities
    : JSON.parse(agent.capabilities as unknown as string);

  // Format date
  const formattedDate = new Date(agent.created_at).toLocaleDateString();
  
  // Status badge color
  const statusColor = agent.status === 'active' ? 'green' : 'gray';
  
  // Card background color
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg={bgColor}
      borderColor={borderColor}
      shadow="sm"
      _hover={{ shadow: 'md' }}
      transition="box-shadow 0.3s"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Badge colorScheme={statusColor} px={2} py={1} borderRadius="full">
          {agent.status}
        </Badge>

        <Tooltip label="Delete Agent" placement="top">
          <IconButton
            aria-label="Delete agent"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(agent.id)}
          />
        </Tooltip>
      </Flex>

      <Heading as="h3" size="md" mb={2} isTruncated>
        {agent.name}
      </Heading>

      <Text fontSize="sm" color="gray.500" mb={4}>
        Created on {formattedDate}
      </Text>

      <Text noOfLines={2} mb={4}>
        {agent.description || 'No description provided.'}
      </Text>

      <Text fontWeight="bold" fontSize="sm" mb={2}>
        Capabilities:
      </Text>
      
      <HStack spacing={2} flexWrap="wrap">
        {capabilities.length > 0 ? (
          capabilities.map((capability: string) => (
            <Tag
              size="sm"
              key={capability}
              variant="subtle"
              colorScheme="blue"
              mb={2}
            >
              <TagLabel>{capability}</TagLabel>
            </Tag>
          ))
        ) : (
          <Text fontSize="sm" fontStyle="italic">
            No capabilities assigned
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default AgentCard;
