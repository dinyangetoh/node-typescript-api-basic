import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import App from './app';
import DefaultController from './app/controllers/default.controller';
import HomeController from './app/controllers/home.controller';

dotenv.config();

// Server Port
const port = Number(process.env.PORT) || 9000;

// Initialize app with Controllers
const app = new App([new DefaultController(), new HomeController()], [bodyParser.json()]);

// Start Server
app.startServer(port);
