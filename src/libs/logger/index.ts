import { Request as ExpressRequest, Response } from 'express';
import winston from 'winston';

// Extend Request interface to include id property
interface Request extends ExpressRequest {
    id?: string;
}

// Custom format with timestamp and colorization
const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, meta }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    }),
);

// Create logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: customFormat,
    transports: [
        // Write logs to console
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), customFormat),
        }),
        // Write error logs to error.log
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: customFormat,
        }),
        // Write all logs to combined.log
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: customFormat,
        }),
    ],
});

// Create a Morgan token that includes request ID
export const requestLogger = (req: Request, _res: Response, next: Function) => {
    // Add request ID for correlation
    req.id = req.id || Date.now().toString();

    // Log request details
    logger.info(`Incoming request: ${req.method} ${req.url}`, {
        requestId: req.id,
        method: req.method,
        url: req.url,
        ip: req.ip,
        headers: req.headers,
    });

    next();
};

export default logger;
