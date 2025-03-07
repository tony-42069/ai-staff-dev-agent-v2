import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AgentCard from '../components/agents/AgentCard';
import AgentForm from '../components/agents/AgentForm';
import agentService, { Agent } from '../services/agents';

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch agents from API
  const fetchAgents = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await agentService.getAgents();
      setAgents(data);
    } catch (err) {
      console.error('Failed to fetch agents:', err);
      setError('Failed to load agents. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load agents',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load agents on component mount
  useEffect(() => {
    fetchAgents();
  }, []);

  // Handle agent deletion
  const handleDeleteAgent = async (id: number) => {
    try {
      await agentService.deleteAgent(id);
      
      // Update local state
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
      
      toast({
        title: 'Agent deleted',
        description: 'The agent was deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Failed to delete agent:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete agent',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle agent creation
  const handleAgentCreated = () => {
    onClose();
    fetchAgents();
  };

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Heading size="lg" mb={2}>
            AI Agents
          </Heading>
          <Text color="gray.500">
            Create and manage your AI staff agents
          </Text>
        </Box>
        
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Create Agent
        </Button>
      </Flex>

      {isLoading ? (
        <Center py={12}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : error ? (
        <Center py={12}>
          <Text color="red.500">{error}</Text>
        </Center>
      ) : agents.length === 0 ? (
        <Center py={12} flexDirection="column">
          <Text mb={4}>No agents found. Create your first agent to get started.</Text>
          <Button colorScheme="blue" onClick={onOpen}>
            Create Agent
          </Button>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={handleDeleteAgent}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Create Agent Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Agent</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AgentForm onAgentCreated={handleAgentCreated} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AgentsPage;
