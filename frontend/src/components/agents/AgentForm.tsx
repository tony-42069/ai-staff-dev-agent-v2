import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  CheckboxGroup,
  Checkbox,
  SimpleGrid,
} from '@chakra-ui/react';
import { CreateAgentDto } from '../../services/agents';
import agentService from '../../services/agents';

interface AgentFormProps {
  onAgentCreated: () => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ onAgentCreated }) => {
  const [formData, setFormData] = useState<CreateAgentDto>({
    name: '',
    description: '',
    capabilities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableCapabilities, setAvailableCapabilities] = useState<string[]>([]);
  const toast = useToast();

  // Fetch available capabilities
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const capabilities = await agentService.getAvailableCapabilities();
        setAvailableCapabilities(capabilities);
      } catch (error) {
        console.error('Failed to fetch capabilities:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch available capabilities',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCapabilities();
  }, [toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCapabilityChange = (selectedCapabilities: string[]) => {
    setFormData((prev) => ({ ...prev, capabilities: selectedCapabilities }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await agentService.createAgent(formData);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        capabilities: [],
      });
      
      // Show success message
      toast({
        title: 'Agent created',
        description: 'The agent was created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Notify parent component
      onAgentCreated();
    } catch (error) {
      console.error('Failed to create agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to create agent',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <Heading as="h2" size="md" mb={4}>
        Create New Agent
      </Heading>
      
      <VStack spacing={4} align="flex-start">
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Agent Name</FormLabel>
          <Input
            id="name"
            name="name"
            placeholder="Enter agent name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the agent's function"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel>Capabilities</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            value={formData.capabilities}
            onChange={handleCapabilityChange}
          >
            <SimpleGrid columns={[1, 2, 3]} spacing={2}>
              {availableCapabilities.map((capability) => (
                <Checkbox key={capability} value={capability}>
                  {capability}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
        
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isFullWidth
        >
          Create Agent
        </Button>
      </VStack>
    </Box>
  );
};

export default AgentForm; 