import { Injectable, Inject } from '@angular/core';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { LoggerService } from '../../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private log: LoggerService
  ) {}

  // use for tracking progress
  upload(request_id: string, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('request_id', request_id);

    const req = new HttpRequest(
      'POST',
      `${this.config.apiEndpoint}/test/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  //returns a list of Files’ information
  getFiles(): Observable<any> {
    // need id
    return this.http.get(`${this.config.apiEndpoint}/files`);
  }

  // Notice the API that the files are finished upload.
  finish(request_id: string) {
    const formData: FormData = new FormData();
    formData.append('request_id', request_id);
    const req = new HttpRequest(
      'POST',
      `${this.config.apiEndpoint}/test/upload/finialize/${request_id}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
}
