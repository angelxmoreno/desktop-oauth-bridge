import { AppConfig } from '@app/config/AppConfig.ts';
import axios, { type AxiosRequestConfig } from 'axios';
import express from 'express';
import asyncify from 'express-asyncify';

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

export const LimitedDevicesRouter = asyncify(express.Router());

LimitedDevicesRouter.get('/auth-url', async (req, res, next) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/device/code',
        params: {
            client_id: AppConfig.google.clientId,
            scope: AppConfig.google.scopes.join(' '),
        },
    };
    const { data } = await axios.request<DeviceCodeResponse>(requestConfig);
    res.json(data);
});

LimitedDevicesRouter.get('/token', async (req, res, next) => {
    const { device_code } = req.query;
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
    res.json(data);
});
