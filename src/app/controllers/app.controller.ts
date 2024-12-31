import { Request, Response } from 'express';
import { appService } from '../../assembly';
import { sendSuccessApiResponse } from '../helpers/apiResponse';

export function getWelcome(req: Request, res: Response): Response {
    const welcomeMessage = appService.getWelcomeMessage();
    return sendSuccessApiResponse(res, { message: welcomeMessage });
}
