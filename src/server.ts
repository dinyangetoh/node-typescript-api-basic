import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import express, { Application, RequestHandler, Router } from 'express';
import App from './app';
import { APP_PORT } from './constants';

dotenv.config();

// Express App
const expressApp: Application = express();

// Express Router
const expressRouter: Router = express.Router();

// Plugins
const plugins: RequestHandler[] = [bodyParser.json()];

// Configurable Request Middlewares
const requestMiddlewares: RequestHandler[] = [];

const app = new App(expressApp, expressRouter, plugins, requestMiddlewares);

// Start Server hereloe
app.startServer(APP_PORT);
