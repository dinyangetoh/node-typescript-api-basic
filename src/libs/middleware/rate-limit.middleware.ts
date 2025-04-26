import rateLimit from 'express-rate-limit';

// Configure default rate limiter
export const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// More strict rate limiter for sensitive routes like authentication
export const authRateLimitMiddleware = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 login requests per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, please try again after an hour',
});
