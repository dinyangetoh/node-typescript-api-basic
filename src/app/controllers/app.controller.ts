import { Request, Response } from 'express';
import { appService } from '../../assembly';

export function getWelcome(req: Request, res: Response): Response {
    const welcomeMessage = appService.getWelcomeMessage();
    return res.json({
        data: welcomeMessage,
    });
}
