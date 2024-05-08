import e from 'express';

export const NotFoundErrorMiddleware = (request: e.Request, response: e.Response, next: e.NextFunction) => {
    response.status(404).json({
        status: 404,
        name: 'NotFoundError',
        message: 'Endpoint not found',
    });
};
