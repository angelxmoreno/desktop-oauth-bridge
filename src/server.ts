import 'reflect-metadata';
import { AppConfig } from '@app/config/AppConfig.ts';
import { IndexController } from '@app/controllers/IndexController.ts';
import { LimitedDevicesController } from '@app/controllers/google/LimitedDevicesController.ts';
import { Logger } from '@app/logger.ts';
import { CustomErrorMiddleware } from '@app/middleware/CustomErrorMiddleware.ts';
import { NotFoundErrorMiddleware } from '@app/middleware/NotFoundErrorMiddleware.ts';
import compression from 'compression';
import express from 'express';
import asyncify from 'express-asyncify';
import morgan from 'morgan';
import { useExpressServer } from 'routing-controllers';

const app = asyncify(express());

app.use(compression());
app.use(morgan('combined'));
useExpressServer(app, {
    development: AppConfig.server.isDev,
    cors: true,
    defaultErrorHandler: false,
    validation: true,
    controllers: [IndexController, LimitedDevicesController],
    middlewares: [CustomErrorMiddleware],
});
app.use(NotFoundErrorMiddleware);
const startServer = async () => {
    const port = import.meta.env.PORT || 3000;

    app.listen(port, () => {
        Logger.info(`Server is running on port ${port}`);
    });
};
export { app, startServer };
