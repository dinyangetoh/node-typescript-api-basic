import morgan from 'morgan';
import logger from './index';

// Create a custom Morgan token for request ID
morgan.token('id', (req: any) => req.id);

// Create a custom Morgan format with request ID and more detailed information
const morganFormat = ':id :remote-addr :method :url :status :response-time ms - :res[content-length]';

// Create a stream that writes Morgan logs to Winston
const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    },
};

// Export the Morgan middleware
export const morganMiddleware = morgan(morganFormat, { stream });

// Combine requestLogger (which adds ID) with Morgan logging
export const httpLogger = [
    (req: any, res: any, next: Function) => {
        req.id = req.id || Date.now().toString();
        next();
    },
    morganMiddleware,
];
