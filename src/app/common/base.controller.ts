import express, { Router } from 'express';
import Controller from '../interfaces/Controller';

export default abstract class BaseController implements Controller {
    routePrefix = '/';

    public router: Router = express.Router();

    protected constructor() {
        this.loadRoutes();
    }

    loadRoutes(): void {}
}
