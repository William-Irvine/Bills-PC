// api.ts - Central API configuration for Bills-PC

const API_BASE_URL = import.meta.env.PROD
  ? 'https://bills-pc-backend.onrender.com'  // Your Render backend URL
  : 'http://localhost:5000';  // Local development

export const api = {
  baseUrl: API_BASE_URL,
  
  /**
   * Generic fetch wrapper with error handling
   */
  async fetch(endpoint: string, options: RequestInit = {}) {
    // Make sure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${normalizedEndpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },
  
  /**
   * GET request
   */
  get: async (endpoint: string) => {
    return api.fetch(endpoint, { method: 'GET' });
  },
  
  /**
   * POST request
   */
  post: async (endpoint: string, data: any) => {
    return api.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { API_BASE_URL };