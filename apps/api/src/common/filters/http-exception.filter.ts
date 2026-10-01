import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponse } from '@parasheba/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected server error occurred';
    let code = 'INTERNAL_SERVER_ERROR';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const errorObj = res as Record<string, any>;
        message = errorObj.message || message;
        code = errorObj.error || `HTTP_${status}`;
        details = errorObj.details;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorPayload: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message: Array.isArray(message) ? message.join(', ') : message,
        details,
      },
    };

    response.status(status).json(errorPayload);
  }
}
