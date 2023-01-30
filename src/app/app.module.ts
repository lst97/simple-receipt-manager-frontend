import { ThirdPartyModule } from './third-party/third-party.module';
import { RequestInterceptor } from './api/request.interceptor';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { MaterialModule } from './third-party/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupViewerComponent } from './common/group-viewer/group-viewer.component';
import { TabGroupComponent } from './common/group-viewer/tab-group/tab-group.component';
import { ReciptTableComponent } from './common/recipt-table/recipt-table.component';
import { ControlGroupComponent } from './common/group-viewer/control-group/control-group.component';
import { PieComponent } from './common/charts/pie/pie.component';
import { ReciptStatisticComponent } from './common/recipt-statistic/recipt-statistic.component';
import { ReciptCalcComponent } from './common/recipt-calc/recipt-calc.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReciptRecordEditDialogComponent } from './common/recipt-record-edit-dialog/recipt-record-edit-dialog.component';
import { RecordEditDialogContentComponent } from './common/recipt-record-edit-dialog/record-edit-dialog-content/record-edit-dialog-content.component';
import { NewGroupDialogComponent } from './common/navbar/new-group-dialog/new-group-dialog.component';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    GroupViewerComponent,
    TabGroupComponent,
    PieComponent,
    ReciptTableComponent,
    ControlGroupComponent,
    ReciptStatisticComponent,
    ReciptCalcComponent,
    ReciptRecordEditDialogComponent,
    RecordEditDialogContentComponent,
    NewGroupDialogComponent,
    WelcomeComponent,
    FileUploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ThirdPartyModule,
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
