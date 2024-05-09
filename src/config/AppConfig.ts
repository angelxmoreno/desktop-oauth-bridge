export const AppConfig = {
    server: {
        name: process.env.SERVER_NAME || 'noname',
        port: process.env.PORT || 3000,
        isDev: process.env.NODE_ENV !== 'production',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        scopes: String(process.env.GOOGLE_SCOPES || '').split(','),
    },
};
