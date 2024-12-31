import { ApiSendResponse, ResponseData } from '../entities/ApiResponse';

export function sendSuccessApiResponse(res: ApiSendResponse, data?: ResponseData, code = 200): ApiSendResponse {
    return res.status(code).send({
        status: 'success',
        data: data || null,
    });
}

export function sendFailApiResponse(
    res: ApiSendResponse,
    message: string,
    errors?: Error[] | string[] | null,
    code = 400,
): ApiSendResponse {
    let errorParams: string[] | null = null;
    if (errors?.length) {
        if (typeof errors[0] === 'string') {
            errorParams = errors as string[];
        } else {
            errorParams = ['Unknown Error'];
        }
    }

    return res.status(code).send({
        status: 'fail',
        message,
        errors: errorParams,
    });
}

export function sendErrorApiResponse(res: ApiSendResponse, message: string, code = 400): ApiSendResponse {
    return res.status(code).send({
        status: 'error',
        message,
    });
}
