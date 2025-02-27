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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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

        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          variant="ghost"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

export default Header;
