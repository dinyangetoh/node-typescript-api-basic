import { Response } from 'express';

export type ResponseData = Record<string, unknown> | Record<string, unknown>[] | string[] | null;

export interface ApiResponse {
    data: ResponseData;
    error: {
        message: string;
        errors?: string[];
    } | null;
}

export interface SuccessSendResponse {
    status: 'success';
    data: ResponseData;
}

export interface FailSendResponse {
    status: 'fail';
    message: string;
    errors: string[] | null;
}

export interface ErrorSendResponse {
    status: 'error';
    message: string;
}

export type SendResponse = SuccessSendResponse | FailSendResponse | ErrorSendResponse;

type Send<ResBody = SendResponse, T = Response<ResBody>> = (body?: ResBody) => T;

export interface ApiSendResponse<T = SendResponse> extends Response {
    send: Send<T, this>;
}
