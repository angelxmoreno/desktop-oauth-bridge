import pino from 'pino';

const pinoConfig =
    import.meta.env.NODE_ENV === 'production'
        ? {}
        : {
              transport: {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                  },
              },
          };

export const Logger = pino(pinoConfig);
