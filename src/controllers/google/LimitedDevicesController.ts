import { AppConfig } from '@app/config/AppConfig.ts';
import axios, { type AxiosRequestConfig } from 'axios';
import { Get, JsonController, QueryParam } from 'routing-controllers';

type DeviceCodeResponse = {
    device_code: string;
    user_code: string;
    verification_url: string;
    expires_in: number;
    interval: number;
};

type TokenResponse = {
    access_token: string;
    expires_in: 3599;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
};

/**
 * https://developers.google.com/identity/protocols/oauth2/limited-input-device
 */

@JsonController('/google/devices')
export class LimitedDevicesController {
    @Get('/code')
    async getDeviceCodeResponse() {
        const requestConfig: AxiosRequestConfig = {
            method: 'post',
            url: 'https://oauth2.googleapis.com/device/code',
            params: {
                client_id: AppConfig.google.clientId,
                scope: AppConfig.google.scopes.join(' '),
            },
        };
        const { data } = await axios.request<DeviceCodeResponse>(requestConfig);
        return data;
    }

    @Get('/token')
    async getTokenResponse(@QueryParam('device_code', { required: true }) device_code: string) {
        if (!device_code) {
            throw new Error(`Missing "device_code"`);
        }
        const requestConfig: AxiosRequestConfig = {
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            params: {
                client_id: AppConfig.google.clientId,
                client_secret: AppConfig.google.clientSecret,
                device_code,
                grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            },
        };
        const { data } = await axios.request<TokenResponse>(requestConfig);
        return data;
    }
}
