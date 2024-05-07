import { Logger } from '@app/logger.ts';
import { startServer } from '@app/server.ts';

startServer().catch(error => Logger.error(error, `Unable to start server due to "${error.message}"`));
