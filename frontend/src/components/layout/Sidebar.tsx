import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Link,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingBag, FiSettings } from 'react-icons/fi';

interface NavItemProps {
  to: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeColor = useColorModeValue('brand.500', 'brand.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        px={4}
        py={3}
        cursor="pointer"
        borderRadius="md"
        role="group"
        fontWeight={isActive ? 'bold' : 'normal'}
        color={isActive ? activeColor : undefined}
        bg={isActive ? useColorModeValue('gray.100', 'gray.700') : undefined}
        _hover={{
          bg: hoverBg,
        }}
        transition="all 0.2s"
      >
        {React.cloneElement(icon, {
          fontSize: "16",
          color: isActive ? activeColor : undefined,
          _groupHover: {
            color: activeColor,
          },
          mr: 3
        })}
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box
      as="nav"
      pos="fixed"
      top="72px"
      left={0}
      w={64}
      h="calc(100vh - 72px)"
      bg={bgColor}
      borderRightWidth="1px"
      borderRightColor={borderColor}
      overflow="auto"
      pt={5}
    >
      <VStack align="stretch" spacing={1} px={4}>
        <NavItem to="/" icon={<FiHome />}>Dashboard</NavItem>
        <NavItem to="/agents" icon={<FiUsers />}>Agents</NavItem>
        <NavItem to="/marketplace" icon={<FiShoppingBag />}>Marketplace</NavItem>
        <NavItem to="/settings" icon={<FiSettings />}>Settings</NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;
