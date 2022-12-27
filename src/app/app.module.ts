import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupViewerComponent } from './group-viewer/group-viewer.component';
import { TabGroupComponent } from './common/tab-group/tab-group.component';

// Chart.js
import { NgChartsModule } from 'ng2-charts';
import { PieComponent } from './common/charts/pie/pie.component';
import { ReciptTableComponent } from './common/recipt-table/recipt-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    GroupViewerComponent,
    TabGroupComponent,
    PieComponent,
    ReciptTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
