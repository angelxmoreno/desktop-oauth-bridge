import { Controller, Get, Response } from '@decorators/express';
import e from 'express';

@Controller('/')
export class IndexController {
    @Get('/')
    index(@Response() res: e.Response) {
        res.send({
            hello: 'world',
        });
    }
}
