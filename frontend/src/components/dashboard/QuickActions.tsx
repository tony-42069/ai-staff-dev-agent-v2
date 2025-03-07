import React from 'react';
import { 
  Box, 
  Button, 
  VStack, 
  Heading,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react';
import { AddIcon, DownloadIcon, SettingsIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
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
      <Heading size="md" mb={4}>Quick Actions</Heading>
      <VStack spacing={3} align="stretch">
        <Tooltip label="Create a new AI agent with custom capabilities">
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="blue" 
            onClick={() => navigate('/agents')}
          >
            Create New Agent
          </Button>
        </Tooltip>
        
        <Tooltip label="Browse the marketplace for pre-built agents">
          <Button 
            leftIcon={<DownloadIcon />} 
            colorScheme="teal"
            onClick={() => navigate('/marketplace')}
          >
            Browse Marketplace
          </Button>
        </Tooltip>
        
        <Tooltip label="Configure platform settings">
          <Button 
            leftIcon={<SettingsIcon />}
            onClick={() => navigate('/settings')}
          >
            Settings
          </Button>
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default QuickActions;
