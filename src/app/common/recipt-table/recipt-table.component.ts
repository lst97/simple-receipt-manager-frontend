import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-recipt-table',
  templateUrl: './recipt-table.component.html',
  styleUrls: ['./recipt-table.component.scss'],
})
export class ReciptTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Name',
    'Recipt No',
    'Date',
    'Payer',
    'Total',
    'Payment Method',
    'Share With',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

// TODO: sort -> https://material.angular.io/components/sort/overview

export interface PeriodicElement {
  name: string;
  recipt_no: number;
  date: string;
  payer: string;
  total: number;
  payment_method: string;
  share_with: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
  {
    name: 'Costco',
    recipt_no: 123422,
    date: '11/03/2022',
    payer: 'Nelson',
    total: 13.2,
    payment_method: 'CASH',
    share_with: 'Jeff',
  },
];
