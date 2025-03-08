import React from 'react';
import { Container, Flex, Box, Image, Text } from '@chakra-ui/react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bgGradient="linear(to-b, purple.900, blue.900)"
    >
      <Container maxW="container.lg" p={0}>
        <Flex direction={{ base: 'column', md: 'row' }}>
          {/* Logo and branding section */}
          <Box 
            w={{ base: 'full', md: '50%' }} 
            p={8}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Image 
              src="/logo-white.png" 
              alt="AiStaff Logo" 
              maxW="200px"
              fallbackSrc="https://via.placeholder.com/200x80?text=AiStaff" 
              mb={6}
            />
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              AI Staff Development Agent
            </Text>
            <Text fontSize="md" textAlign="center">
              Join our platform to create and manage AI agents that transform your business operations with autonomous productivity.
            </Text>
          </Box>
          
          {/* Register form section */}
          <Box 
            w={{ base: 'full', md: '50%' }} 
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <RegisterForm />
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export default RegisterPage;
