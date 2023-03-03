import { Request, Response } from 'express';
import BaseController from '../common/base.controller';

export default class HomeController extends BaseController {
    public routePrefix = 'home';

    constructor() {
        super();
    }

    loadRoutes(): void {
        /* eslint-disable @typescript-eslint/unbound-method */
        this.router.get('/', this.getWelcome);
        /* eslint-enable @typescript-eslint/unbound-method */
    }

    // Remove route
    public getWelcome(req: Request, res: Response): Response {
        return res.json({
            data: 'This is home controller',
        });
    }
}
