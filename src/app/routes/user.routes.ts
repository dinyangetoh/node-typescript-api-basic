import { RequestHandler, Router } from 'express';
import { login, registerUser } from '../controllers/user.controller';

export default (router: Router, requestMiddlewares: RequestHandler[]): void => {
    router.post('/login', login);
    router.post('/user', ...requestMiddlewares, registerUser);
};
