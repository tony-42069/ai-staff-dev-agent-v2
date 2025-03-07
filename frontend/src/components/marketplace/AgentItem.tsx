import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { StarIcon, DownloadIcon } from '@chakra-ui/icons';
import { MarketplaceListing } from '../../types/Marketplace';
import useMarketplace from '../../hooks/useMarketplace';
import useAgents from '../../hooks/useAgents';

interface AgentItemProps {
  listing: MarketplaceListing;
}

const AgentItem: React.FC<AgentItemProps> = ({ listing }) => {
  const { installAgent } = useMarketplace();
  const { fetchAgents } = useAgents();
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleInstall = async () => {
    try {
      const result = await installAgent(listing.id);
      
      if (result.success) {
        toast({
          title: 'Agent installed',
          description: `${listing.name} has been added to your agents`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Refresh the agents list to show the newly installed agent
        fetchAgents();
      } else {
        toast({
          title: 'Installation failed',
          description: result.message || 'There was an error installing the agent',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Installation failed',
        description: 'There was an error installing the agent',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error installing agent:', error);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      shadow="md"
      transition="all 0.3s"
      _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
      bg={bgColor}
      borderColor={borderColor}
    >
      <Heading size="md" mb={2}>{listing.name}</Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>By {listing.author}</Text>
      
      {/* Description */}
      <Text mb={4} noOfLines={2}>{listing.description}</Text>
      
      {/* Capabilities */}
      <Stack direction="row" mb={4} flexWrap="wrap">
        {listing.capabilities.map((capability) => (
          <Badge key={capability} colorScheme="teal" mr={2} mb={2}>
            {capability}
          </Badge>
        ))}
      </Stack>
      
      {/* Stats Section */}
      <Flex justify="space-between" mb={4}>
        <Stat>
          <StatLabel>Price</StatLabel>
          <StatNumber fontSize="md">${listing.price.toFixed(2)}</StatNumber>
        </Stat>
        
        <Stat>
          <StatLabel>Downloads</StatLabel>
          <StatNumber fontSize="md">
            <Flex alignItems="center">
              <DownloadIcon mr={1} />
              {listing.downloads}
            </Flex>
          </StatNumber>
        </Stat>
        
        <Stat>
          <StatLabel>Rating</StatLabel>
          <StatNumber fontSize="md">
            <Flex alignItems="center">
              <StarIcon mr={1} color="yellow.400" />
              {listing.rating.toFixed(1)}
            </Flex>
          </StatNumber>
        </Stat>
      </Flex>
      
      {/* Install Button */}
      <Button 
        colorScheme="blue" 
        width="full" 
        onClick={handleInstall}
        mt={2}
      >
        Install Agent
      </Button>
    </Box>
  );
};

export default AgentItem;
