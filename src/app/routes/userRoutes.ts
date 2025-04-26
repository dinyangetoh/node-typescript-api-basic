import { RequestHandler, Router } from 'express';
import { getUserController } from '../../assembly';
import { authRateLimitMiddleware } from '../../libs/middleware/rate-limit.middleware';

const router = Router();

export default (requestMiddleware: RequestHandler[]): Router => {
    router.get('/', getUserController().home);
    router.post('/login', authRateLimitMiddleware, getUserController().login);
    router.post('/user', ...requestMiddleware, getUserController().registerUser);
    router.get('/:userId', getUserController().getUser);
    return router;
};
