import { IndexController } from '@app/controllers/IndexController.ts';
import { attachControllers } from '@decorators/express';
import express from 'express';

const app = express();

app.listen(3000);

export const startServer = async () => {
    const port = import.meta.env.PORT || 3000;
    await attachControllers(app, [IndexController]);

    app.listen(port, () => {
        //@TODO add real logging
        console.info(`Server is running on port ${port}`);
    });
};
