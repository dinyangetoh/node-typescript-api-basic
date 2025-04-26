import { NextFunction, Request, Response } from 'express';
import { sendFailApiResponse } from '../../app/helpers/apiResponse';

/**
 * Middleware to handle routes that don't exist
 */
export function notFoundMiddleware(req: Request, res: Response, _next: NextFunction): Response {
    return sendFailApiResponse(
        res,
        'Resource not available',
        [`The requested resource at ${req.method} ${req.originalUrl} was not found`],
        404,
    );
}
