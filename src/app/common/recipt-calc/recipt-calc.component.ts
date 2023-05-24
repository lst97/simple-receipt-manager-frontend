import { GroupService } from './../../api/group/group.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Groups, Receipt } from 'src/app/api/group/group';
import { filter } from 'rxjs';
export interface RecordElement {
  date: string;
  total: string;
  payer: string;
  share_with: string[];
  payment_status: string;
}

export interface CalcElement {
  from_user: string;
  to_user: string;
  amounts: string;
}

interface PaymentStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recipt-calc',
  templateUrl: './recipt-calc.component.html',
  styleUrls: ['./recipt-calc.component.scss'],
})
export class ReciptCalcComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedPaymentStatus = '';
  recordDisplayedColumns: string[] = ['date', 'total', 'payer', 'share_with'];
  calcDisplayedColumns: string[] = ['from_user', 'to_user', 'amounts'];
  recordTableDataSource!: MatTableDataSource<RecordElement>;
  calcTableDataSource!: MatTableDataSource<CalcElement>;
  paymentStatus: PaymentStatus[] = [
    { value: 'true', viewValue: 'PAID' },
    { value: 'false', viewValue: 'UNPIAD' },
    { value: '', viewValue: 'BOTH' },
  ];
  billTableData!: number[][];
  userList!: string[];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructBillTable(records: RecordElement[]) {
    let billTableData: number[][] = [];
    this.userList.forEach((user) => {
      let row: number[] = [];
      this.userList.forEach((user) => {
        row.push(0);
      });
      billTableData.push(row);
    });
    records.forEach((record) => {
      if (!(record.payer == '' || record.share_with.length == 0)) {
        let payerIndex = this.userList.indexOf(record.payer);
        let shareWith = record.share_with;
        let amount = parseFloat(record.total) / (shareWith.length + 1);
        shareWith.forEach((user) => {
          let userIndex = this.userList.indexOf(user);
          billTableData[payerIndex][userIndex] += amount;
        });
      }
    });
    this.billTableData = billTableData;
  }

  // calculate bill
  calculateBill() {
    let records: RecordElement[] = [];
    this.recordTableDataSource.filteredData.forEach((record) => {
      records.push(record);
    });
    this.constructBillTable(records);
    let calc_data: CalcElement[] = [];
    this.billTableData.forEach((row, i) => {
      row.forEach((amount, j) => {
        if (amount > 0) {
          calc_data.push({
            from_user: this.userList[i],
            to_user: this.userList[j],
            amounts: amount.toFixed(2),
          });
        }
      });
    });
    this.calcTableDataSource = new MatTableDataSource<CalcElement>(calc_data);
  }
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recordTableDataSource.filter = filterValue.trim().toLowerCase();
    this.calculateBill();
  }

  applyStatusFilter() {
    const filterValue = this.selectedPaymentStatus;
    this.recordTableDataSource.filter = filterValue.trim();
    this.calculateBill();
  }

  applyDateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recordTableDataSource.filter = filterValue.trim().toLowerCase();
    this.calculateBill();
  }

  constructor(private groupService: GroupService, private router: Router) {}
  ngAfterViewInit() {
    // get user list
    this.groupService
      .getGroupInfo(this.router.url.split('/')[2])
      .subscribe((response) => {
        let group = response as Groups;
        this.userList = group.users;
      });

    // get receipt list
    let record_data: RecordElement[] = [];
    this.groupService
      .getGroupRecords(this.router.url.split('/')[2])
      .subscribe((response) => {
        let receipts = response as Receipt[];
        receipts.forEach((element) => {
          record_data.push({
            date: element.date,
            total: element.total,
            payer: element.payer,
            share_with: element.share_with,
            payment_status: element.payment_status,
          });
        });
        this.recordTableDataSource = new MatTableDataSource<RecordElement>(
          record_data
        );
        this.recordTableDataSource.paginator = this.paginator;
      });
  }
}
