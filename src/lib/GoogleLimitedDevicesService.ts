import { AppConfig } from '@app/config/AppConfig.ts';
import axios, { type AxiosRequestConfig } from 'axios';
import { OAuth2Client } from 'google-auth-library';

export type DeviceCodeResponse = {
    device_code: string;
    user_code: string;
    verification_url: string;
    expires_in: number;
    interval: number;
};

export type TokenResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
};

export interface UserInfoResponse {
    access_token: string;
    expires_on: Date;
    refresh_token: string;
    id_token: string;
    email: string | null;
    email_verified: boolean | null;
    name: string | null;
    picture: string | null;
    given_name: string | null;
    family_name: string | null;
}

export interface GoogleLimitedDevicesOptions {
    clientId: string;
    clientSecret: string;
    scopes: string[];
}

export class GoogleLimitedDevicesService {
    googleOAuth2Client: OAuth2Client;
    scopes: string[];

    constructor({ clientId, clientSecret, scopes }: GoogleLimitedDevicesOptions) {
        this.googleOAuth2Client = new OAuth2Client({
            clientId,
            clientSecret,
        });
        this.scopes = scopes;
    }

    async getDeviceCodeResponse() {
        const requestConfig: AxiosRequestConfig = {
            method: 'post',
            url: 'https://oauth2.googleapis.com/device/code',
            params: {
                client_id: this.googleOAuth2Client._clientId,
                scope: AppConfig.google.scopes.join(' '),
            },
        };
        const { data } = await axios.request<DeviceCodeResponse>(requestConfig);
        return data;
    }

    async getTokenResponse(device_code: string) {
        const requestConfig: AxiosRequestConfig = {
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            params: {
                client_id: this.googleOAuth2Client._clientId,
                client_secret: this.googleOAuth2Client._clientSecret,
                device_code,
                grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            },
        };
        const { data } = await axios.request<TokenResponse>(requestConfig);
        return data;
    }
}
