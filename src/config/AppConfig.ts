export const AppConfig = {
    server: {
        isDev: import.meta.env.NODE_ENV !== 'production',
    },
    google: {
        clientId: import.meta.env.GOOGLE_CLIENT_ID,
        clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        scopes: String(import.meta.env.GOOGLE_SCOPES || '').split(','),
    },
};
