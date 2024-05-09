import { AppConfig } from '@app/config/AppConfig.ts';
import { GoogleLimitedDevicesService } from '@app/lib/GoogleLimitedDevicesService.ts';
import { isAxiosError } from 'axios';
import e from 'express';
import { Get, JsonController, QueryParam, Res } from 'routing-controllers';

@JsonController('/google/devices')
export class LimitedDevicesController {
    client: GoogleLimitedDevicesService;

    constructor() {
        this.client = new GoogleLimitedDevicesService({
            clientId: AppConfig.google.clientId,
            clientSecret: AppConfig.google.clientSecret,
            scopes: AppConfig.google.scopes,
        });
    }

    @Get('/code')
    async getDeviceCodeResponse() {
        return this.client.getDeviceCodeResponse();
    }

    /**
     * @deprecated
     * @param device_code
     */
    @Get('/token')
    async getTokenResponse(@QueryParam('device_code', { required: true }) device_code: string) {
        if (!device_code) {
            throw new Error(`Missing "device_code"`);
        }
        return this.client.getTokenResponse(device_code);
    }

    @Get('/token-with-user')
    async getTokenAndUserResponse(
        @QueryParam('device_code', { required: true }) device_code: string,
        @Res() res: e.Response,
    ) {
        if (!device_code) {
            throw new Error(`Missing "device_code"`);
        }
        try {
            const tokenResponse = await this.client.getTokenResponse(device_code);
            return this.client.getUserInfo(tokenResponse);
        } catch (e) {
            if (isAxiosError(e) && e.response?.status === 428) {
                res.status(202);
                return e.response.data;
            }

            throw e;
        }
    }
}
