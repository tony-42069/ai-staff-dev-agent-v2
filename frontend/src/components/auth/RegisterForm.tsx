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
import { useNavigate, Link as RouterLink } from 'react-router-dom';

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, error, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await register(username, email, password, fullName || undefined);
      toast({
        title: 'Registration successful',
        description: 'You have been registered and logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (err: any) {
      toast({
        title: 'Registration failed',
        description: err.response?.data?.detail || 'Unable to register',
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
        <Heading size="lg" mb={6} color="blue.700">Create an Account</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.username} isRequired>
            <FormLabel color="gray.700">Username</FormLabel>
            <Input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel color="gray.700">Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          
          <FormControl>
            <FormLabel color="gray.700">Full Name</FormLabel>
            <Input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name (optional)"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          
          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.confirmPassword} isRequired>
            <FormLabel color="gray.700">Confirm Password</FormLabel>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              color="gray.800"
              borderColor="gray.300"
              _placeholder={{ color: "gray.400" }}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            isLoading={isSubmitting}
            loadingText="Creating account..."
          >
            Register
          </Button>
          
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          
          <Text align="center" color="gray.700">
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500" fontWeight="bold">
              Sign in here
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
