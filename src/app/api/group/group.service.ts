import { LoggerService } from './../../log/logger.service';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private log: LoggerService
  ) {
    this.log.info('GroupService Initialized.');
  }

  // Method for making a GET request
  getGroups(): Observable<any> {
    return this.http.get<string>(`${this.config.apiEndpoint}/groups`);
  }

  getGroupsName(): Observable<any> {
    return this.http.get<string>(`${this.config.apiEndpoint}/groups_name`);
  }

  // Method for making a POST request
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body);
  }

  // Method for making a PUT request
  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body);
  }

  // Method for making a DELETE request
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url);
  }
}
