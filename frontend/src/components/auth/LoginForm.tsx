import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  Heading, 
  Text, 
  useToast, 
  Link, 
  FormErrorMessage 
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/dashboard';

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await login(username, password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: err.response?.data?.detail || 'Invalid credentials',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
      <Box textAlign="center">
        <Heading size="lg" mb={6} color="blue.700">Sign In to AiStaff</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.username} isRequired>
            <FormLabel color="gray.700">Username</FormLabel>
            <Input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            isLoading={isSubmitting}
            loadingText="Signing in..."
          >
            Sign in
          </Button>
          
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          
          <Text align="center" color="gray.700">
            Don't have an account?{' '}
            <Link as={RouterLink} to="/register" color="blue.500" fontWeight="bold">
              Register here
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
