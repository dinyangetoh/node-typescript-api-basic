import { Request, Response } from 'express';
import { sendSuccessApiResponse } from '../helpers/apiResponse';
import AppService from '../services/AppService';
import BaseController from './BaseController';

export default class AppController extends BaseController {
    constructor(private readonly appService: AppService) {
        super();
    }

    public getWelcome(req: Request, res: Response): Response {
        const welcomeMessage = this.appService.getWelcomeMessage();
        return sendSuccessApiResponse(res, { message: welcomeMessage });
    }
}
