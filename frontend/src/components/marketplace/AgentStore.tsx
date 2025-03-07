import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue
} from '@chakra-ui/react';
import AgentItem from './AgentItem';
import useMarketplace from '../../hooks/useMarketplace';

const AgentStore: React.FC = () => {
  const { listings, loading, error, fetchListings } = useMarketplace();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Show loading state
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text mt={4} fontSize="lg">Loading marketplace listings...</Text>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="md"
        my={6}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Failed to load marketplace
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error}
          <Box mt={4}>
            <Text
              as="button"
              color="blue.500"
              fontWeight="bold"
              onClick={() => fetchListings()}
              _hover={{ textDecoration: 'underline' }}
            >
              Try again
            </Text>
          </Box>
        </AlertDescription>
      </Alert>
    );
  }

  // Show empty state
  if (listings.length === 0) {
    return (
      <Box p={5} bg={bgColor} borderRadius="md" shadow="sm">
        <Heading size="lg" mb={6} color={headingColor}>Agent Marketplace</Heading>
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="md"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No listings available
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            There are currently no agents available in the marketplace.
            Check back later for new additions.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  // Show listings
  return (
    <Box p={5} bg={bgColor} borderRadius="md" shadow="sm">
      <Heading size="lg" mb={6} color={headingColor}>Agent Marketplace</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {listings.map(listing => (
          <AgentItem key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AgentStore;
