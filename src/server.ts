import { IndexController } from '@app/controllers/IndexController.ts';
import { HttpLogger, Logger } from '@app/logger.ts';
import { attachControllers } from '@decorators/express';
import express from 'express';

const httpLogger = require('pino-http')();

const app = express();
app.use(HttpLogger);
app.listen(3000);

export const startServer = async () => {
    const port = import.meta.env.PORT || 3000;
    await attachControllers(app, [IndexController]);

    app.listen(port, () => {
        Logger.info(`Server is running on port ${port}`);
    });
};
