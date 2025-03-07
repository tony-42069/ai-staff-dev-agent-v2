import React from 'react';
import { Container, Box, Heading, Text, Divider } from '@chakra-ui/react';
import AgentStore from '../components/marketplace/AgentStore';

const MarketplacePage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={5}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>Agent Marketplace</Heading>
        <Text color="gray.600">
          Discover and install pre-built AI agents with specialized capabilities
        </Text>
        <Divider mt={4} />
      </Box>
      
      <AgentStore />
    </Container>
  );
};

export default MarketplacePage;
