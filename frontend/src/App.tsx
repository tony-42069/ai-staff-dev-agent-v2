import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Page components
import AgentsPage from './pages/AgentsPage';
import MarketplacePage from './pages/MarketplacePage';

// Placeholder components for other routes
const Dashboard = () => <Box p={8}>Dashboard coming soon</Box>;
const Settings = () => <Box p={8}>Settings coming soon</Box>;

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Sidebar />
        <Box as="main" pl={64} pt={16}>
          <Routes>
            <Route path="/" element={<Navigate to="/agents" replace />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
