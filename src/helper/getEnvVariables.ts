// Environment variables configuration
// This file centralizes all environment variable access for better maintainability

interface EnvironmentVariables {
    // Add new environment variables here as needed
    // Example: API_URL: string;
    // Example: ANALYTICS_ID: string;
}

export const getEnvVariables = (): EnvironmentVariables => {
    return {
        // Add your environment variables here
        // Example: API_URL: import.meta.env.VITE_API_URL,
    };
};

// Helper function to validate required environment variables
export const validateEnvVariables = (): void => {
    const env = getEnvVariables();
    const requiredVars: (keyof EnvironmentVariables)[] = [
        // Add required environment variables here
        // Example: 'API_URL',
    ];

    const missingVars = requiredVars.filter(key => !env[key]);

    if (missingVars.length > 0) {
        console.error('Missing required environment variables:', missingVars);
        throw new Error(`Missing required environment variables: ${ missingVars.join(', ') }`);
    }
};
