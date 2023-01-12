import { LoggerService } from './../log/logger.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) {
    loggerService.info('Request Interceptor Initialized.');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method === 'POST') {
      request = request.clone({
        headers: new HttpHeaders({ token: 'TEST_TOKEN_!@#456' }),
      });
    }
    return next.handle(request);
  }
}
