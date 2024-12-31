import { Request, Response } from 'express';
import { sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { userService } from '../../assembly';
import { LoginDto } from '../dto/Login.dto';

export async function registerUser(req: Request, res: Response): Promise<Response> {
    const { body: newUser } = req;

    const registerUserDto = plainToInstance(RegisterUserDto, newUser);

    const errors = await validate(registerUserDto);
    if (errors.length) {
        return sendFailApiResponse(
            res,
            'Input validation failed',
            errors.map((error) => `${error.property} field not valid`),
        );
    }

    try {
        await userService.registerUser(newUser);
        return sendSuccessApiResponse(res, { message: 'User registered' }, 201);
    } catch (err) {
        // console.error(err);
        return sendFailApiResponse(res, err.message || 'User registration failed');
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    const loginDto = plainToInstance(LoginDto, req.body);

    const errors = await validate(loginDto);
    if (errors.length) {
        return sendFailApiResponse(
            res,
            'Input validation failed',
            errors.map((error) => `${error.property} field not valid`),
        );
    }

    try {
        const { token } = await userService.login(loginDto);
        return sendSuccessApiResponse(res, { token });
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Login failed');
    }
}
