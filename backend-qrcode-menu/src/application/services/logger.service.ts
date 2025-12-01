import { Injectable } from "@nestjs/common";
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";

@Injectable()
export class LoggerService {
    private logger: WinstonLogger;
    private context: string | null = null;

    constructor() {
        this.logger = createLogger({
            level: process.env.LOGGER_LEVEL || 'info',
            defaultMeta: {},

            transports: [
                // Console: formato "Nest-like"
                new transports.Console({
                    format: format.combine(
                        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                        format((info) => {
                            const colors: Record<string, string> = {
                                info: '\x1b[32m',
                                warn: '\x1b[33m',
                                error: '\x1b[31m',
                                debug: '\x1b[34m',
                            };

                            const reset = '\x1b[0m';

                            if (info.level && colors[info.level]) {
                                info.level = `${colors[info.level]}${info.level.toUpperCase()}${reset}`;
                            } else {
                                info.level = info.level.toUpperCase();
                            }

                            return info;
                        })(),
                        format.printf((info) => {
                            const { timestamp, level, message, context, ...rest } = info;

                            const ctx = context || '';
                            const ctxPart = ctx ? ` [${ctx}]` : '';
                            const ctxColor = '\x1b[36m';
                            const reset = '\x1b[0m';
                            const messageColor = '\x1b[92m';
                            const messageInfo = `${messageColor}${message}${reset}`;
                            const metaColor = '\x1b[93m';
                            const meta =
                                Object.keys(rest).length > 0
                                    ? '\n' + metaColor + JSON.stringify(rest, null, 2)
                                    : '';

                            return `[${level}] ${timestamp}${ctxColor}${ctxPart}${reset} → ${messageInfo}${meta}`;
                        })
                    ),
                }),

                // Arquivo: JSON estruturado
                new DailyRotateFile({
                    dirname: 'LOGS',
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: format.combine(format.timestamp(), format.json()),
                }),
            ],
        });
    }

    info<T, M>(message: string, meta?: M) {
        this.logger.info(message, this.attachContext(meta));
    }

    log(message: any) {
        this.logger.info(message);
    }

    warn(message: string, meta?: any) {
        this.logger.warn(message, this.attachContext(meta));
    }

    error(message: string, meta?: any) {
        this.logger.error(message, this.attachContext(meta));
    }

    debug(message: string, meta?: any) {
        this.logger.debug(message, this.attachContext(meta));
    }


    setContext(context: string) {
        this.context = context;
    }

    private attachContext(meta?: any) {
        return {
            ...(meta || {}),
            context: this.context,
        };
    }
}