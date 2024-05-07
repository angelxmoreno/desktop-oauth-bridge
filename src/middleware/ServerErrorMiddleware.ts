import { AppConfig } from '@app/config/AppConfig.ts';
import { isAxiosError } from 'axios';
import e from 'express';

export const ServerErrorMiddleware = (error: Error, request: e.Request, response: e.Response, next: e.NextFunction) => {
    const { name, message, stack } = error;
    response.status(500).json({
        name,
        message,
        response: isAxiosError(error) ? error.response?.data : undefined,
        stack: AppConfig.server.isDev ? stack : undefined,
    });
    next();
};
