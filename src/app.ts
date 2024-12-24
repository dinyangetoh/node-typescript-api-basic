import { Application, RequestHandler, Router } from 'express';
import appRoutes from './app/routes/app.routes';

export default class App {
    constructor(
        private readonly expressApp: Application,
        private readonly expressRouter: Router,
        private readonly plugins: RequestHandler[],
        private readonly requestMiddlewares: RequestHandler[],
    ) {}

    public initialize(): void {
        this.loadPlugins();
        this.loadRoutes(this.expressRouter);
        this.expressApp.use(this.expressRouter);
    }

    public startServer(port: number) {
        this.initialize();
        this.expressApp.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    private loadPlugins(): void {
        this.plugins.forEach((plugin) => {
            this.expressApp.use(plugin);
        });
    }

    private loadRoutes(router: Router) {
        appRoutes(router, this.requestMiddlewares);
    }
}
