import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, RequestHandler, Router } from 'express';
import App from './app';
import { APP_PORT } from './constants';
import logger from './libs/logger';
import {
    corsMiddleware,
    helmetMiddleware,
    httpLogger,
    notFoundMiddleware,
    rateLimitMiddleware,
} from './libs/middleware';

// Load environment variables
dotenv.config();

// Express App
const expressApp: Application = express();

// Express Router
const expressRouter: Router = express.Router();

// Security middleware
// expressApp.use(helmetMiddleware);
// expressApp.use(corsMiddleware);

// // Logging middleware
// expressApp.use(httpLogger);

// // Rate limiting middleware
// expressApp.use(rateLimitMiddleware);

// Plugins
const plugins: RequestHandler[] = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressRouter,
    ...httpLogger,
];

// Configurable Request Middlewares
const requestMiddleware: RequestHandler[] = [helmetMiddleware, corsMiddleware, rateLimitMiddleware];

const app = new App(expressApp, plugins, requestMiddleware);

// Initialize the app to set up routes
app.initialize();

// Register the not found middleware as the last middleware after all routes
expressApp.use(notFoundMiddleware);

// Start Server here
app.startServer(APP_PORT);

// Log that server has started
logger.info(`Server started on port ${APP_PORT}`);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
