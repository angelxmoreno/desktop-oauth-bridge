import { AppConfig } from '@app/config/AppConfig.ts';
import pino from 'pino';

const pinoConfig = AppConfig.server.isDev
    ? {
          transport: {
              target: 'pino-pretty',
              options: {
                  colorize: true,
              },
          },
      }
    : {};

export const Logger = pino(pinoConfig);
