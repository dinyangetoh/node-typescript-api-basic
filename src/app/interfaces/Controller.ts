import { Router } from 'express';

export default interface Controller {
    routePrefix: string;
    router: Router;

    loadRoutes(): void;
}
