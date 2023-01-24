import { FileUploaderComponent } from './../../file-uploader/file-uploader.component';
import { LoggerService } from './../../../logger/logger.service';
import { ReciptRecordEditDialogComponent } from './../../recipt-record-edit-dialog/recipt-record-edit-dialog.component';
import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-control-group',
  templateUrl: './control-group.component.html',
  styleUrls: ['./control-group.component.scss'],
})
export class ControlGroupComponent {
  files: File[] = [];
  base64Images = [];

  constructor(
    @Optional() private logger: LoggerService,
    private dialog: MatDialog
  ) {}

  openManuelAddDialog(
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

  openUploadDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.maxHeight = 'none';
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    this.dialog.open(FileUploaderComponent, dialogConfig);
  }
}
