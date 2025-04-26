import { Application, RequestHandler } from 'express';
import 'reflect-metadata';
import appRoutes from './app/routes/appRoutes';
import userRoutes from './app/routes/userRoutes';
import { getAppController } from './assembly';

export default class App {
    private initialized = false;

    constructor(
        private readonly expressApp: Application,
        private readonly plugins: RequestHandler[],
        private readonly requestMiddleware: RequestHandler[],
    ) {}

    public initialize(): void {
        if (this.initialized) return;

        this.loadPlugins();
        this.loadRoutes();
        this.initialized = true;
    }

    public startServer(port: number) {
        if (!this.initialized) {
            this.initialize();
        }

        this.expressApp.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    private loadPlugins(): void {
        this.plugins.forEach((plugin) => {
            this.expressApp.use(plugin);
        });
    }

    private loadRoutes() {
        // Mount routers on specific paths
        this.expressApp.use('/', appRoutes(getAppController(), this.requestMiddleware));
        this.expressApp.use('/user', userRoutes(this.requestMiddleware));
    }
}
