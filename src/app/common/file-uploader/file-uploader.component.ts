import { LoggerService } from './../../logger/logger.service';
import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/api/file/file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

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
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['Temp PASS', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedFiles?: FileList;

  // displaying selected files.
  selectedFileNames: string[] = [];

  // items for display upload progress of each images.
  // Each item will have 2 fields: percentage & fileName.
  progressInfos: any[] = [];

  message: string[] = [];

  previews: string[] = [];
  request_id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private router: Router,
    private logger: LoggerService
  ) {}

  // selected Images that gonna upload.
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        // representing the file’s data as a base64 encoded string
        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File, requiest_id: string): void {
    this.logger.info(this.groud_id);
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
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          let msg = file.name + ': Failed!';

          if (err.error && err.error.message) {
            msg += ' ' + err.error.message;
          }
          this.message.push(msg);
        },
        complete: () => {
          this.logger.success('File upload complete.');
        },
      });
    }
  }

  uploadFiles(): void {
    this.message = [];
    this.request_id = uuid();
    this.groud_id = this.router.url.split('/').pop() as string;
    this.fileService.total_files = this.selectFiles.length;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], this.request_id);
      }
    }
  }
}
