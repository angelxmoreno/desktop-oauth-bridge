import { Get, JsonController } from 'routing-controllers';

@JsonController('')
export class IndexController {
    @Get('/')
    index() {
        return { hello: 'world2' };
    }
}
