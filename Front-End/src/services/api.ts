import axios from 'axios';

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    // In production, use the deployed API URL
    return '/api';
  }
  // In development, use the proxy configured in vite.config.ts
  return '/api';
};

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API endpoints
const api = {
  // Auth endpoints
  auth: {
    // Register a new user
    register: async (userData: { email: string; password: string; company: string; userName: string }) => {
      try {
        const response = await axiosInstance.post('/users/register', userData);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Registration failed'
        };
      }
    },

    // Sign in user
    login: async (credentials: { email: string; password: string }) => {
      try {
        const response = await axiosInstance.post('/users/login', credentials);
        if (response.data.success && response.data.user) {
          // Store user info in local storage
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Login failed'
        };
      }
    },

    // Get user profile
    getProfile: async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch profile'
        };
      }
    },

    // Update user profile
    updateProfile: async (userId: string, userData: any) => {
      try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, userData);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update profile'
        };
      }
    },

    // Logout user
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { success: true };
    }
  },

  // Device endpoints
  devices: {
    // Get all devices for a user
    getUserDevices: async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/devices/user/${userId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch devices'
        };
      }
    },

    // Get device details
    getDeviceDetails: async (userId: string, deviceMac: string) => {
      try {
        const response = await axiosInstance.get(`/devices/${userId}/${deviceMac}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch device details'
        };
      }
    }
  },

  // Logs endpoints
  logs: {
    // Create a new log
    createLog: async (logData: any) => {
      try {
        const response = await axiosInstance.post('/logs', logData);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to create log'
        };
      }
    },

    // Get all logs for a user
    getUserLogs: async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/logs/user/${userId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch logs'
        };
      }
    },

    // Get logs for a specific device
    getDeviceLogs: async (userId: string, deviceMac: string) => {
      try {
        const response = await axiosInstance.get(`/logs/device/${userId}/${deviceMac}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch device logs'
        };
      }
    },

    // Get log statistics
    getLogStatistics: async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/logs/statistics/${userId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch log statistics'
        };
      }
    },

    // Get log by ID
    getLogById: async (logId: string) => {
      try {
        const response = await axiosInstance.get(`/logs/${logId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch log'
        };
      }
    }
  },

  // Contact endpoints
  contact: {
    // Submit contact form
    submitContactForm: async (contactData: { name: string; email: string; phone: string; message: string }) => {
      try {
        const response = await axiosInstance.post('/contact', contactData);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to submit contact form'
        };
      }
    }
  }
};

export default api; 