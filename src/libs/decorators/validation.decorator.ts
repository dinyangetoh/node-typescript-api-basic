import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { sendFailApiResponse } from '../../app/helpers/apiResponse';

type RequestProperty = 'body' | 'query' | 'params';

/**
 * Validates and transforms request input data using DTO
 * @param dto The DTO class to validate against
 * @param reqProperty The request property to validate ('body', 'query', or 'params')
 */
export function ValidateInput(dto: any, reqProperty: RequestProperty = 'body') {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, ...args: any[]) {
            // Transform input data to DTO instance
            const input = req[reqProperty];
            const dtoInstance = plainToInstance(dto, input);

            // Validate against the DTO
            const errors = await validate(dtoInstance);

            if (errors.length) {
                return sendFailApiResponse(
                    res,
                    'Input validation failed',
                    errors.map((error) => `${error.property} field not valid`),
                );
            }

            // Replace the request property with the validated DTO
            req[reqProperty] = dtoInstance;

            // Call the original method with the validated data
            return originalMethod.apply(this, [req, res, ...args]);
        };

        return descriptor;
    };
}
