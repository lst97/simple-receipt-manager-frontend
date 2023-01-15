import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  private formatLogString(
    msg: string,
    moduleName: string,
    callerName: string,
    level: string
  ): string {
    let logString = '';
    let currentDateTime = new Date().toLocaleString();

    logString += `[${currentDateTime}] `; // "D - CALLER [] FROM [] - INFO: this is a test string"

    if (callerName != '') logString += `- CALLER ${[callerName]} `;

    if (moduleName != '') logString += `FROM ${[moduleName]} `;
    logString += `- ${level}: ${msg}`;

    return logString;
  }

  info(msg: string, moduleName = '', callerName = ''): void {
    let logString = this.formatLogString(msg, moduleName, callerName, 'INFO');
    console.log(logString);
  }
  success(msg: string, moduleName = '', callerName = ''): void {
    let logString = this.formatLogString(
      msg,
      moduleName,
      callerName,
      'SUCCESS'
    );
    console.log(logString);
  }
  warn(msg: string, moduleName = '', callerName = ''): void {
    let logString = this.formatLogString(msg, moduleName, callerName, 'WARN');
    console.log(logString);
  }
  error(msg: string, moduleName = '', callerName = ''): void {
    let logString = this.formatLogString(msg, moduleName, callerName, 'ERROR');
    console.log(logString);
  }
  fatal(msg: string, moduleName = '', callerName = ''): void {
    let logString = this.formatLogString(msg, moduleName, callerName, 'FATAL');
    console.log(logString);
  }
}
