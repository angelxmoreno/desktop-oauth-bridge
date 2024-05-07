import { randomUUID } from 'node:crypto';
import pino from 'pino';
import pinoHttp from 'pino-http';

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

export const HttpLogger = pinoHttp({
    logger: Logger,
    genReqId(req, res) {
        const existingID = req.id ?? req.headers['x-request-id'];
        if (existingID) return existingID;
        const id = randomUUID();
        res.setHeader('X-Request-Id', id);
        return id;
    },

    serializers: {
        req: pino.stdSerializers.wrapRequestSerializer(r => {
            delete r.headers['cookie'];
            return r;
        }),
        err: pino.stdSerializers.err,
        res: pino.stdSerializers.res,
    },

    // Set to `false` to prevent standard serializers from being wrapped.
    wrapSerializers: true,

    // Define a custom logger level
    customLogLevel(req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        } else if (res.statusCode >= 500 || err) {
            return 'error';
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
        }
        return 'info';
    },

    // Define a custom success message
    customSuccessMessage(req, res) {
        if (res.statusCode === 404) {
            return 'resource not found';
        }
        return `${req.method} completed`;
    },

    // Define a custom receive message
    customReceivedMessage(req, res) {
        return 'request received: ' + req.method;
    },

    // Define a custom error message
    customErrorMessage(req, res, err) {
        return 'request errored with status code: ' + res.statusCode;
    },

    // Override attribute keys for the log object
    customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken',
    },
});
