import { LoggerService } from '@application/services/logger.service';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url } = req;

        const start = Date.now();

        this.logger.info<string, { method: string; url: string }>('Incoming request', { method, url });

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - start;

                this.logger.info<string, { method: string; url: string; duration: number }>('Request completed', {
                    method,
                    url,
                    duration,
                });
            }),
        );
    }
}
