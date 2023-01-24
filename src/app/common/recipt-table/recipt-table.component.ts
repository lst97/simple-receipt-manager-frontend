import { GroupService } from './../../api/group/group.service';
import { LoggerService } from './../../logger/logger.service';
import { Component, ViewChild, OnInit, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    private router: ActivatedRoute,
    private groupService: GroupService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.groupService.getGroupInfo(params['id']).subscribe((response) => {
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
