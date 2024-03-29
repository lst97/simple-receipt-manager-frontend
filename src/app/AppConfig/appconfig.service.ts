import { InjectionToken } from '@angular/core';
import { AppConfig } from './appconfig.interface';
import { environment } from 'src/environment/enviroment';

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint,
  apiPrefix: environment.apiPrefix,
};
