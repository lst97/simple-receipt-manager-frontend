import { GroupService } from './../../api/group/group.service';
import { LoggerService } from './../../logger/logger.service';
import { Component, ViewChild, OnInit, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ReceiptRecordElement } from './recipt-table';
import { ReceiptService } from 'src/app/api/receipt/receipt.service';
import { Receipt } from 'src/app/api/receipt/receipt';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipt-table',
  templateUrl: './recipt-table.component.html',
  styleUrls: ['./recipt-table.component.scss'],
})
export class ReciptTableComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Receipt No',
    'Date',
    'Payer',
    'Total',
    'Payment Method',
    'Share With',
  ];
  // TODO: sort -> https://material.angular.io/components/sort/overview
  groupRecords: ReceiptRecordElement[] = [];
  dataSource!: MatTableDataSource<ReceiptRecordElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Optional() private logger: LoggerService,
    private router: ActivatedRoute,
    private groupService: GroupService,
    private receiptService: ReceiptService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.groupService.getGroupInfo(params['id']).subscribe((response) => {
        this.groupRecords = [];
        let data = response.data;
        let observables = data.map((record: any) =>
          this.receiptService.getReceipt(record.receipt)
        );

        forkJoin(observables).subscribe((receipts: any) => {
          receipts.forEach((receipt: Receipt) => {
            let receiptRecordElement: ReceiptRecordElement = {
              merchant_name: receipt.merchant_name,
              receipt_no: receipt.receipt_no,
              date: receipt.date,
              payer: receipt.payer,
              total: receipt.total,
              payment_method: receipt.payment_method,
              share_with: receipt.share_with,
            };
            this.groupRecords.push(receiptRecordElement);
          });

          this.dataSource = new MatTableDataSource<ReceiptRecordElement>(
            this.groupRecords
          );
          this.dataSource.paginator = this.paginator;
        });
      });
    });
  }
}
