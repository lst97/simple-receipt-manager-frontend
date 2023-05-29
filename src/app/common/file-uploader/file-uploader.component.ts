import { ImageViewerComponent } from './../image-viewer/image-viewer.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SnackbarService } from './../../snackbar/snackbar.service';
import { LoggerService } from './../../logger/logger.service';
import { Component, Optional } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/api/file/file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { UploadProgressElement } from './file-uploader';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class FileUploaderComponent {
  groupRecords: UploadProgressElement[] = [];
  dataSource!: MatTableDataSource<UploadProgressElement>;
  displayedColumns: string[] = ['File Name', 'Progress', 'Value', 'Message'];
  groud_id!: string;
  animateDuration: string = '500';
  selectImageFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  processImageFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedFiles?: FileList;
  selectedFilesInfo: string[] = [];
  validFilesFlags?: boolean[];
  validFilesCount?: number;
  response?: any;
  onload_info?: any[];
  isUploadProgressCompleted: boolean = false;

  // displaying selected files.
  selectedFileNames: string[] = [];

  // items for display upload progress of each images.
  // Each item will have 2 fields: percentage & fileName.
  progressInfos: any[] = [];

  message: string[] = [];

  previews: string[] = [];
  request_id: string = '';
  requestContainError: boolean = false;
  requestContainSuccess: boolean = false;
  isSecondStepAvaliable: boolean = false;
  procressingHeaderMessage: string = 'Processing...';
  procressingMessage: string = 'Please wait...';
  uploadingHeaderMessage: string = 'Uploading...';
  uploadingMessage: string = 'Please wait...';
  isUploadContainError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FileUploaderComponent>,
    @Optional() private logger: LoggerService
  ) {}

  openSnackBar(message: string) {
    this.snackbarService.add(message);
  }

  // selected Images that gonna upload.
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.validFilesFlags = [];
    this.validFilesCount = 0;
    this.previews = [];
    this.selectedFilesInfo = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        this.validFilesFlags.push(false);
        this.previews.push('');
        this.selectedFileNames.push('');
        this.selectedFilesInfo.push('');
      }
      for (let idx = 0; idx < numberOfFiles; idx++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const content = e.target.result;
          let image = new Image();
          image.src = content;
          image.onload = () => {
            this.selectedFilesInfo[
              idx
            ] = `${image.naturalWidth} x ${image.naturalHeight}`;

            this.previews[idx] = content;
            this.validFilesFlags![idx] = true;
            this.selectedFileNames![idx] = this.selectedFiles![idx].name;
            this.validFilesCount! += 1;
            this.selectImageFormGroup.disable();
          };
          image.onerror = () => {
            this.snackbarService.add(
              `Invalid image: "${this.selectedFiles![idx].name}".`
            );
            this.logger.error(
              'Invalid image format.',
              'file-uploader.component',
              'selectFiles()'
            );
          };
        };

        try {
          // representing the file’s data as a base64 encoded string
          reader.readAsDataURL(this.selectedFiles[idx]);
        } catch (e: any) {
          this.logger.error(e.message);
        }
      }
    } else {
      this.selectImageFormGroup.enable();
    }
  }

  upload(idx: number, file: File, requiest_id: string): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      let record: UploadProgressElement = {
        file_name: this.selectedFileNames![idx],
        progress: 0,
        message: 'Uploading...',
      };
      this.groupRecords.push(record as UploadProgressElement);
      this.fileService
        .upload(idx + 1, this.groud_id, requiest_id, file)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(
                (100 * event.loaded) / event.total
              );

              record.progress = this.progressInfos![idx].value;
              this.dataSource = new MatTableDataSource<UploadProgressElement>(
                this.groupRecords
              );
            } else if (event instanceof HttpResponse) {
              const msg = `${file.name}: Completed!`;
              this.message.push(msg);
              this.requestContainSuccess = true;

              if (idx + 1 === this.validFilesFlags!.length) {
                // last page
                this.response = event.body;
                this.procressingHeaderMessage = 'Processing complete!';
                if (this.requestContainError) {
                  this.isSecondStepAvaliable = false;
                  this.processImageFormGroup.enable();
                } else {
                  this.isSecondStepAvaliable = true;
                  this.processImageFormGroup.disable();
                  this.procressingMessage = 'Done!';
                }
              }
              record.message = 'Completed!';
              this.dataSource = new MatTableDataSource<UploadProgressElement>(
                this.groupRecords
              );
            }
          },
          error: (err: any) => {
            this.progressInfos[idx].value = 0;

            // prevent multiple snackbar messages
            if (!this.requestContainError) {
              this.procressingMessage =
                'Process contain error, please try again!';
              this.openSnackBar('Image(s) processing contain error.');
              this.requestContainError = true;
              this.isSecondStepAvaliable = false;
              this.processImageFormGroup.enable();
            }

            if (this.validFilesFlags!.length - 1 === idx) {
              this.procressingHeaderMessage = 'Processing complete!';
            }
            record.progress = this.progressInfos[idx].value;
            record.message = err.error.message;
            this.dataSource = new MatTableDataSource<UploadProgressElement>(
              this.groupRecords
            );
          },
        });
    }
  }

  uploadFiles(): void {
    this.message = [];
    this.requestContainError = this.requestContainSuccess = false;
    this.isSecondStepAvaliable = false;
    this.dataSource = new MatTableDataSource<UploadProgressElement>([]);
    this.groupRecords = [];
    this.processImageFormGroup.enable();
    this.request_id = uuid();
    this.groud_id = this.router.url.split('/').pop() as string;

    this.fileService.total_files =
      this.validFilesFlags?.filter((value) => value === true).length || 0;
    for (let i = 0; i < this.validFilesFlags!.length; i++) {
      if (this.validFilesFlags![i] === true) {
        this.upload(i, this.selectedFiles![i], this.request_id);
      }
    }
  }

  submit() {
    this.fileService
      .submit(this.request_id, this.groud_id, this.response)
      .subscribe((res: any) => {
        this.isUploadProgressCompleted = true;
        if (res.status === 200) {
          this.uploadingHeaderMessage = 'Upload complete!';
          this.uploadingMessage = 'Done!';
          this.openSnackBar('Data submitted successfully.');
        } else {
          this.isUploadContainError = true;
          this.uploadingMessage = 'Data submitted failed, please try again!';
          this.openSnackBar('Data submitted failed.');
        }
      });
  }

  openImageViewer(idx: number) {
    let data = {
      base64: this.previews[idx],
      file_name: this.selectedFileNames[idx],
      info: this.selectedFilesInfo[idx],
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.maxWidth = '1000px';
    dialogConfig.maxHeight = '100%';
    dialogConfig.panelClass = 'fullscreen-dialog';
    this.dialog.open(ImageViewerComponent, dialogConfig);
  }

  processingBack() {
    this.message = [];
    this.requestContainError = this.requestContainSuccess = false;
    this.isSecondStepAvaliable = false;
    this.procressingHeaderMessage = 'Processing...';
    this.procressingMessage = 'Please wait...';
    this.groupRecords = [];
    this.dataSource = new MatTableDataSource<UploadProgressElement>([]);
    this.processImageFormGroup.enable();
    this.request_id = uuid();
  }

  closeDialog() {
    console.log('close dialog');
    this.dialogRef.close();
    // refresh router with current url
    window.location.reload();
  }
}
