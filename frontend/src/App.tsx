import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Page components
import AgentsPage from './pages/AgentsPage';

// Placeholder components for other routes
const Dashboard = () => <Box p={8} pt={24} pl={72}>Dashboard coming soon</Box>;
const Marketplace = () => <Box p={8} pt={24} pl={72}>Marketplace coming soon</Box>;
const Settings = () => <Box p={8} pt={24} pl={72}>Settings coming soon</Box>;

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Sidebar />
        <Box as="main">
          <Routes>
            <Route path="/" element={<Navigate to="/agents" replace />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
