// src/config/index.ts

interface Config {
    API_BASE_URL: string;
    AUTH_BACKEND_URL: string;
    APP_NAME: string;
    APP_VERSION: string;
    IS_DEVELOPMENT: boolean;
    ENVIRONMENT: string;
  }
  
  // Set different configurations based on environment
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Get environment variables with fallbacks
  const localUrl = import.meta.env.VITE_LOCAL_API_URL || 'https://localhost:8080';
  const stagingUrl = import.meta.env.VITE_STAGING_API_URL || 'https://mbpc89pp26.ap-south-1.awsapprunner.com';
  const productionUrl = import.meta.env.VITE_PRODUCTION_API_URL || 'https://3vwmqxsunp.ap-south-1.awsapprunner.com';
  const authBackendUrl = import.meta.env.VITE_AUTH_BACKEND_URL || 'https://api.aliencoach.com';
  
  // Determine which URL to use based on environment
  const getApiUrl = () => {
    const env = import.meta.env.VITE_ENVIRONMENT || 'development';    
    switch (env) {
      case 'production':
        return productionUrl;
      case 'staging':
        return stagingUrl;
      case 'local':
        return localUrl;
      default:
        return isDevelopment ? localUrl : stagingUrl;
    }
  };

  const config: Config = {
    // Base URL for API calls
    API_BASE_URL: `${getApiUrl()}/api`,
    
    // Auth Backend URL
    AUTH_BACKEND_URL: authBackendUrl,
    
    // Application information
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Telusko Learning Platform',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    
    // Environment flag
    IS_DEVELOPMENT: isDevelopment,
    
    // Current environment
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || (isDevelopment ? 'development' : 'staging'),
  };
  
  export default config;