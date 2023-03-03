import express, { Application, RequestHandler } from 'express';
import BaseController from './app/common/BaseController';

export default class App {
    public expressApp: Application = express();

    constructor(readonly controllers: BaseController[], readonly plugins: RequestHandler[]) {}

    public init() {
        this.loadPlugins();
        this.loadRoutes();
    }

    private loadPlugins() {
        this.plugins.forEach((plugin) => {
            this.expressApp.use(plugin);
        });
    }

    private loadRoutes() {
        this.controllers.forEach(({ router, routePrefix }) => {
            this.expressApp.use(`/${routePrefix}`, router);
        });
    }

    public startServer(port = 9000) {
        this.init();
        this.expressApp.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
