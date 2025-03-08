import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      width="full"
      shadow="sm"
      py={4}
      px={8}
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      zIndex="docked"
    >
      <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
        <HStack spacing={4}>
          <Heading as="h1" size="md" letterSpacing="tight">
            AI Staff
          </Heading>
          <Text fontSize="xs" color="gray.500" mt={1}>
            v0.1.0
          </Text>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            variant="ghost"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
          
          {user && (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
              >
                <HStack>
                  <Avatar
                    size="sm"
                    name={user.full_name || user.username}
                    bg="blue.500"
                    color="white"
                  />
                  <Text>{user.full_name || user.username}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <Text px={3} py={2} fontSize="sm" fontWeight="bold" color="gray.500">
                  {user.email}
                </Text>
                <Divider />
                <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
