// Using JSX without needing React import (new JSX Transform)
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth components and context
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Page components
import DashboardPage from './pages/DashboardPage';
import AgentsPage from './pages/AgentsPage';
import MarketplacePage from './pages/MarketplacePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Box as="main" pl={64} pt={16}>
                      <Navigate to="/dashboard" replace />
                    </Box>
                  </>
                }
              />
              
              <Route
                path="/dashboard"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Box as="main" pl={64} pt={16}>
                      <DashboardPage />
                    </Box>
                  </>
                }
              />
              
              <Route
                path="/agents"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Box as="main" pl={64} pt={16}>
                      <AgentsPage />
                    </Box>
                  </>
                }
              />
              
              <Route
                path="/marketplace"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Box as="main" pl={64} pt={16}>
                      <MarketplacePage />
                    </Box>
                  </>
                }
              />
              
              <Route
                path="/settings"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Box as="main" pl={64} pt={16}>
                      <SettingsPage />
                    </Box>
                  </>
                }
              />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
