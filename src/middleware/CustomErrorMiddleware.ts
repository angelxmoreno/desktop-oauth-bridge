import { Logger } from '@app/logger.ts';
import { isAxiosError } from 'axios';
import e from 'express';
import { type ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: e.Request, response: e.Response, next: e.NextFunction) {
        Logger.info({ wtf: error }, 'wtf');
        let errorObj = {
            status: error.httpCode || 500,
            name: error.name,
            message: error.message,
            data: undefined,
            stack: error.stack,
        };
        if (isAxiosError(error)) {
            errorObj = {
                ...errorObj,
                status: error.response?.status || 500,
                name: 'AxiosClientError',
                data: error.response?.data,
            };
        } else if (error.toJSON) {
            errorObj = error.toJSON();
        }
        response.status(errorObj.status).json(errorObj);
    }
}
