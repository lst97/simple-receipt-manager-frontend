import { throwError } from 'rxjs';
import { SnackbarService } from './../../snackbar/snackbar.service';
import { LoggerService } from './../../logger/logger.service';
import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/api/file/file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

function isValidImage(file: string) {
  let isValid = false;
  let image = new Image();

  image.src = file;
  image.onload = function () {
    //This should load the image so that you can actually check
    //height and width.
    if (image.height === 0 || image.width === 0) isValid = false;
    else isValid = true;
  };
  return isValid ? true : false;
}
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
  groud_id!: string;
  animateDuration: string = '500';
  panelOpenState = false;
  selectImageFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  processImageFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedFiles?: FileList;
  validFilesFlags?: boolean[];
  validFilesCount?: number;

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

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private router: Router,
    private snackbarService: SnackbarService,
    private logger: LoggerService
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
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let idx = 0; idx < numberOfFiles; idx++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const content = e.target.result;

          let image = new Image();

          image.src = content;
          image.onload = () => {
            this.previews.push(content);
            this.validFilesCount! += 1;
            this.validFilesFlags!.push(true);
            this.selectImageFormGroup.disable();
          };
          image.onerror = () => {
            this.logger.error(
              'Invalid image format.',
              'file-uploader.component',
              'selectFiles()'
            );
          };
        };

        // TODO: only push valid file name.
        this.selectedFileNames.push(this.selectedFiles![idx].name);
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

  upload(idx: number, file: File, requiest_id: string, sequence: number): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.fileService.upload(this.groud_id, requiest_id, file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = file.name + ': Successful!';
            this.message.push(msg);
            this.requestContainSuccess = true;
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          let msg = file.name + ': Failed!';

          if (err.error && err.error.message) {
            msg += ' ' + err.error.message;
          }
          this.message.push(msg);
          if (this.requestContainError == false) {
            this.openSnackBar('Image(s) processing contain error.');
            this.requestContainError = true;
          }
        },
        complete: () => {
          if (this.validFilesFlags!.length - 1 == sequence) {
            this.openSnackBar('Image(s) processing complete.');
            if (this.requestContainSuccess == true) {
              this.isSecondStepAvaliable = true;
              this.processImageFormGroup.disable();
            }
          }
          this.logger.success('File(s) upload complete.');
        },
      });
    }
  }

  uploadFiles(): void {
    this.message = [];
    this.requestContainError = false;
    this.requestContainSuccess == false;
    this.isSecondStepAvaliable = false;

    this.processImageFormGroup.enable();
    this.request_id = uuid();
    this.groud_id = this.router.url.split('/').pop() as string;
    this.fileService.total_files = this.validFilesFlags!.length;
    if (this.validFilesFlags) {
      for (let i = 0; i < this.validFilesFlags.length; i++) {
        if (this.validFilesFlags[i] == true) {
          this.upload(i, this.selectedFiles![i], this.request_id, i);
        }
      }
    }
  }
}
