import { Injectable, Inject } from '@angular/core';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { LoggerService } from '../../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  total_files: number;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private logger: LoggerService
  ) {
    this.total_files = 0;
  }

  // use for tracking progress
  upload(
    page: number,
    group_id: string,
    request_id: string,
    file: File
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    let data = {
      pagination: { page: page, total: this.total_files },
      metadata: {
        clientVersion: '0.1',
        language: 'en-US',
        requestId: request_id,
        timestamp: new Date().toISOString(),
        deviceType: 'website',
      },
    };

    formData.append('file', file);
    formData.append('data', JSON.stringify(data));

    const req = new HttpRequest(
      'POST',
      `${this.config.apiEndpoint}${this.config.apiPrefix}/group/${group_id}/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  submit(request_id: string, group_id: string, json: JSON) {
    const requestBody = {
      metadata: {
        clientVersion: '0.1',
        language: 'en-US',
        requestId: request_id,
        timestamp: new Date().toISOString(),
        deviceType: 'website',
      },
      ...json, // Include the existing JSON data
    };

    return this.http.post(
      `${this.config.apiEndpoint}${this.config.apiPrefix}/group/${group_id}/submit`,
      requestBody,
      {
        observe: 'response',
      }
    );
  }
}
