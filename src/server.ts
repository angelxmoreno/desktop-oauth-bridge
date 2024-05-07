import { HttpLogger, Logger } from '@app/logger.ts';
import { ServerErrorMiddleware } from '@app/middleware/ServerErrorMiddleware.ts';
import { IndexRouter } from '@app/routes/IndexRouter';
import { LimitedDevicesRouter } from '@app/routes/google/LimitedDevice.ts';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import asyncify from 'express-asyncify';

const app = asyncify(express());

app.use(cors());
app.use(compression());
app.use(HttpLogger);

app.use('/', IndexRouter);
app.use('/google/devices', LimitedDevicesRouter);

app.use(ServerErrorMiddleware);

export const startServer = async () => {
    const port = import.meta.env.PORT || 3000;

    app.listen(port, () => {
        Logger.info(`Server is running on port ${port}`);
    });
};
