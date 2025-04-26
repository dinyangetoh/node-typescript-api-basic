import cors from 'cors';

// Configure default CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Request-ID'],
    credentials: true,
    maxAge: 86400, // 24 hours
};

// Export the CORS middleware
export const corsMiddleware = cors(corsOptions);
