import { IndexController } from '@app/controllers/IndexController.ts';
import { HttpLogger, Logger } from '@app/logger.ts';
import { attachControllers } from '@decorators/express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(compression());
app.use(HttpLogger);

export const startServer = async () => {
    const port = import.meta.env.PORT || 3000;
    await attachControllers(app, [IndexController]);

    app.listen(port, () => {
        Logger.info(`Server is running on port ${port}`);
    });
};
