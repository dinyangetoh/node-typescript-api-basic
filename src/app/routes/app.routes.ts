import { RequestHandler, Router } from 'express';
import { getWelcome } from '../controllers/app.controller';

export default (router: Router, requestMiddlewares: RequestHandler[]): void => {
    router.get('/', ...requestMiddlewares, getWelcome);
};
