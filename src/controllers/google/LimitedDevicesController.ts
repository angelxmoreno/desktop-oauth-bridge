import { AppConfig } from '@app/config/AppConfig.ts';
import { GoogleLimitedDevicesService } from '@app/lib/GoogleLimitedDevicesService.ts';
import { Get, JsonController, QueryParam } from 'routing-controllers';

/**
 * https://developers.google.com/identity/protocols/oauth2/limited-input-device
 */

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

    @Get('/token')
    async getTokenResponse(@QueryParam('device_code', { required: true }) device_code: string) {
        if (!device_code) {
            throw new Error(`Missing "device_code"`);
        }
        return this.client.getTokenResponse(device_code);
    }
}
