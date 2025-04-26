import { Request, Response } from 'express';
import { ValidateInput } from '../../libs/decorators';
import { LoginDto } from '../dto/Login.dto';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { UserHomeDto, UserHomeParamsDto } from '../dto/UserHomeDto';
import { sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
import UserService from '../services/UserService';
import BaseController from './BaseController';
export default class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super();
    }

    @ValidateInput(UserHomeDto, 'query')
    public home(req: Request, res: Response): Response {
        const { test } = req.query;
        return sendSuccessApiResponse(res, { message: 'Welcome to USER API', test });
    }

    @ValidateInput(UserHomeParamsDto, 'params')
    public getUser(req: Request, res: Response): Response {
        const { userId } = req.params;
        return sendSuccessApiResponse(res, { message: `Welcome, your user id is ${userId}` });
    }

    @ValidateInput(RegisterUserDto)
    public async registerUser(req: Request, res: Response): Promise<Response> {
        try {
            await this.userService.registerUser(req.body);
            return sendSuccessApiResponse(res, { message: 'User registered' }, 201);
        } catch (err) {
            // console.error(err);
            return sendFailApiResponse(res, err.message || 'User registration failed');
        }
    }

    @ValidateInput(LoginDto)
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = await this.userService.login(req.body);
            return sendSuccessApiResponse(res, { token });
        } catch (err) {
            return sendFailApiResponse(res, err.message || 'Login failed');
        }
    }
}
