import { GroupService } from './../../api/group/group.service';
import { LoggerService } from './../../logger/logger.service';
import { Component, ViewChild, OnInit, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptRecordElement } from './recipt-table';

@Component({
  selector: 'app-recipt-table',
  templateUrl: './recipt-table.component.html',
  styleUrls: ['./recipt-table.component.scss'],
})
export class ReciptTableComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Recipt No',
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
    private activeRouter: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.groupService
        .getGroupRecords(this.router.url.split('/')[2])
        .subscribe((response) => {
          this.groupRecords = [];
          response.forEach((record: ReceiptRecordElement) => {
            this.groupRecords.push(record as ReceiptRecordElement);
          });

          this.dataSource = new MatTableDataSource<ReceiptRecordElement>(
            this.groupRecords
          );
          this.dataSource.paginator = this.paginator;
        });
    });
  }
}
