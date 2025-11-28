import { Injectable } from "@nestjs/common";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

@Injectable()
export class LoggerService {
    private logger;
    constructor() {
        this.logger = createLogger({
            level: process.env.LOGGER_LEVEL || 'info',
            format: format.combine(
                format.timestamp(),
                format.json(),
            ),
            defaultMeta: { service: 'user-service' },
            transports: [
                new transports.Console(),
                new DailyRotateFile({
                    dirname: 'LOGS',
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                })
            ],
        })
    }

    info<T, M>(message: string, meta?: M) {
        this.logger.info(message, meta);
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }
}