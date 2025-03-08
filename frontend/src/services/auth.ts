import api, { setAuthTokens, clearAuthTokens } from './api';
import { User, LoginCredentials, RegisterCredentials, AuthTokens } from '../types/Auth';

// Auth service with endpoints
const AuthService = {
  /**
   * Register a new user
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await api.post<User>('/auth/register', credentials);
    return response.data;
  },

  /**
   * Login user and store tokens
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Convert to form data format for OAuth2 compatibility
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post<AuthTokens>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store tokens
    const { access_token, refresh_token } = response.data;
    setAuthTokens(access_token, refresh_token);

    // Get and return user data
    return AuthService.getCurrentUser();
  },

  /**
   * Logout user and clear tokens
   */
  logout: (): void => {
    clearAuthTokens();
    // Reload page or redirect
    window.location.href = '/';
  },

  /**
   * Get current user information
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('aistaff_access_token');
  },
};

export default AuthService;
