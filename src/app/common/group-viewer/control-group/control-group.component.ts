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

  fileInputChange(fileInputEvent: any) {
    this.files = fileInputEvent.target.files;
    if (this.files.length > 0) {
      for (const file of this.files) {
        console.log(file);
      }
    } else {
      this.logger.error(
        'No Image Selected.',
        'control-group.component',
        'imageInputChange()'
      );
    }
  }

  // JUST FOR TEST, it should handle by file-uploader component
  uploadFiles(files: File[]) {
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // USE uploader.service ------
        // this.base64Images.push(reader.result);
        // if(this.base64Images.length === this.files.length){
        //   this.http.post('/api/upload', this.base64Images).subscribe(
        //     response => {
        //       console.log(response);
        //     },
        //     error => {
        //       console.log(error);
        //     }
        //   );
        // }
      };
    }
  }

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
