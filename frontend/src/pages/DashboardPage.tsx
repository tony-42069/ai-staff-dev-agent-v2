import React from 'react';
import { 
  Box, 
  Grid, 
  GridItem, 
  Heading, 
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  useColorModeValue 
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

// Import dashboard components
import StatisticsWidget from '../components/dashboard/StatisticsWidget';
import QuickActions from '../components/dashboard/QuickActions';
import ActivityChart from '../components/dashboard/ActivityChart';
import AgentStatusWidget from '../components/dashboard/AgentStatusWidget';

// Import custom hook
import useDashboard from '../hooks/useDashboard';

const DashboardPage: React.FC = () => {
  const { stats, activities, loading, error } = useDashboard();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  if (loading) {
    return (
      <Center py={12}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

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
        <AlertDescription mt={4} mb={6}>
          {error}
        </AlertDescription>
        <Button
          leftIcon={<RepeatIcon />}
          colorScheme="blue"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Box p={5} bg={bgColor} minH="calc(100vh - 64px)">
      <Box mb={6}>
        <Heading size="lg" mb={2}>Dashboard</Heading>
        <Text color="gray.600">
          Overview of your AI Staff platform
        </Text>
      </Box>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* Statistics Widget */}
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <StatisticsWidget stats={stats} loading={loading} />
        </GridItem>

        {/* Quick Actions */}
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <QuickActions />
        </GridItem>

        {/* Agent Status */}
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <AgentStatusWidget stats={stats} loading={loading} />
        </GridItem>

        {/* Activity Chart - Full Width */}
        <GridItem colSpan={12} mt={6}>
          <ActivityChart data={activities} loading={loading} />
        </GridItem>
      </Grid>

      {/* System Status or Additional Information */}
      <Box mt={8} p={5} borderRadius="md" borderWidth="1px" borderColor="gray.200">
        <Text fontWeight="bold" mb={2}>System Status: <Text as="span" color="green.500">Operational</Text></Text>
        <Text color="gray.600" fontSize="sm">
          All AI staff services are running optimally. Last system check: {new Date().toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};

export default DashboardPage;
