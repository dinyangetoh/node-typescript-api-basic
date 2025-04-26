import { RequestHandler, Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

export default (controller: AppController, requestMiddlewares: RequestHandler[]): Router => {
    router.get('/', ...requestMiddlewares, controller.getWelcome);
    return router;
};
