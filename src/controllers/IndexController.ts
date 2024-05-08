import { AppConfig } from '@app/config/AppConfig.ts';
import { Get, JsonController } from 'routing-controllers';

@JsonController('')
export class IndexController {
    @Get('/')
    index() {
        return {
            hello: 'world',
            name: AppConfig.server.name,
            nodeEnv: process.env.NODE_ENV,
            isDev: AppConfig.server.isDev,
        };
    }
}
