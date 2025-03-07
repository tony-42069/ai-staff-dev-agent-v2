import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  FormControl, 
  FormLabel, 
  Switch, 
  Input, 
  Button,
  Grid, 
  GridItem,
  Divider,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

const SettingsPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} bg={bgColor} minH="calc(100vh - 64px)">
      <Box mb={6}>
        <Heading size="lg" mb={2}>Settings</Heading>
        <Text color="gray.600">
          Configure your AI Staff platform
        </Text>
      </Box>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* General Settings */}
        <GridItem colSpan={{ base: 12, md: 6 }}>
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md" 
            bg={cardBgColor}
            borderColor={borderColor}
          >
            <Heading size="md" mb={4}>General Settings</Heading>
            <Divider mb={4} />
            
            <VStack spacing={4} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="dark-mode" mb="0">
                  Dark Mode
                </FormLabel>
                <Switch id="dark-mode" />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="notifications" mb="0">
                  Enable Notifications
                </FormLabel>
                <Switch id="notifications" defaultChecked />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="auto-refresh" mb="0">
                  Auto-refresh Dashboard
                </FormLabel>
                <Switch id="auto-refresh" defaultChecked />
              </FormControl>
              
              <Button colorScheme="blue" alignSelf="flex-start" onClick={handleSave}>
                Save General Settings
              </Button>
            </VStack>
          </Box>
        </GridItem>

        {/* API Settings */}
        <GridItem colSpan={{ base: 12, md: 6 }}>
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md"
            bg={cardBgColor}
            borderColor={borderColor}
          >
            <Heading size="md" mb={4}>API Settings</Heading>
            <Divider mb={4} />
            
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>API Key</FormLabel>
                <Input placeholder="Enter API key" value="••••••••••••••••" type="password" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Endpoint URL</FormLabel>
                <Input placeholder="API endpoint" defaultValue="https://api.example.com/v1" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Request Timeout (seconds)</FormLabel>
                <Input type="number" defaultValue={30} />
              </FormControl>
              
              <Button colorScheme="blue" onClick={handleSave}>
                Save API Settings
              </Button>
            </VStack>
          </Box>
        </GridItem>

        {/* Agent Settings */}
        <GridItem colSpan={12}>
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md"
            bg={cardBgColor}
            borderColor={borderColor}
          >
            <Heading size="md" mb={4}>Agent Default Settings</Heading>
            <Divider mb={4} />
            
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormControl mb={4}>
                  <FormLabel>Default Status</FormLabel>
                  <Input defaultValue="inactive" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="auto-activate" mb="0">
                    Auto-activate New Agents
                  </FormLabel>
                  <Switch id="auto-activate" />
                </FormControl>
              </GridItem>
              
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormControl mb={4}>
                  <FormLabel>Default Capability</FormLabel>
                  <Input defaultValue="text_processing" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="enable-logging" mb="0">
                    Enable Agent Logging
                  </FormLabel>
                  <Switch id="enable-logging" defaultChecked />
                </FormControl>
              </GridItem>
            </Grid>
            
            <Button colorScheme="blue" mt={4} onClick={handleSave}>
              Save Agent Settings
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
