import { LoggerService } from '../../logger/logger.service';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receipt } from './receipt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private log: LoggerService
  ) {
    this.log.info('ReceiptService Initialized.');
  }

  getReceipt(id: string): Observable<Receipt> {
    return this.http
      .get<Receipt>(
        `${this.config.apiEndpoint}${this.config.apiPrefix}/receipts/${id}`
      )
      .pipe(
        map((response: any) => {
          let data = response.data;
          const receipt: Receipt = {
            abn: data.abn,
            date: data.date,
            file_name: data.file_name,
            merchant_name: data.merchant_name,
            merchant_phone: data.merchant_phone,
            payer: data.payer,
            payment_method: data.payment_method,
            status: data.status,
            receipt_no: data.receipt_no,
            share_with: data.share_with,
            time: data.time,
            total: data.total,
          };
          return receipt;
        })
      );
  }

  getAllReceipts(): Observable<any> {
    return this.http.get<string>(
      `${this.config.apiEndpoint}${this.config.apiPrefix}/receipts`
    );
  }
}
