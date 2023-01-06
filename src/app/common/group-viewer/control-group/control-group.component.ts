import { ReciptRecordEditDialogComponent } from './../../recipt-record-edit-dialog/recipt-record-edit-dialog.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-control-group',
  templateUrl: './control-group.component.html',
  styleUrls: ['./control-group.component.scss'],
})
export class ControlGroupComponent {
  constructor(public dialog: MatDialog) {}

  imageInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.maxHeight = 'none';
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    this.dialog.open(ReciptRecordEditDialogComponent, dialogConfig);
  }
}
