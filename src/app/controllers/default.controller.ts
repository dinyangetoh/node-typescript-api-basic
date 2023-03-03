import { Request, Response } from 'express';
import BaseController from '../common/base.controller';

export default class DefaultController extends BaseController {
    constructor() {
        super();
    }

    loadRoutes() {
        /* eslint-disable @typescript-eslint/unbound-method */
        this.router.get('/', this.index);
        /* eslint-enable @typescript-eslint/unbound-method */
    }

    index(req: Request, res: Response): Response {
        return res.json({
            data: 'Nothing happens here',
        });
    }
}
