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
    group_id: string,
    request_id: string,
    file: File
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('request_id', request_id);
    formData.append('total_files', this.total_files.toString());

    const req = new HttpRequest(
      'POST',
      `${this.config.apiEndpoint}/test/upload/${group_id}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  submit(json: JSON) {
    return this.http.post(`${this.config.apiEndpoint}/test/submit`, json, {
      observe: 'response',
    });
  }
}
