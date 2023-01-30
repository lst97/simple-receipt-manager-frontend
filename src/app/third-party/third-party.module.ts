import { NgModule } from '@angular/core';

import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
// Chart.js
import { NgChartsModule } from 'ng2-charts';
const ThirdPartyComponents = [NgxIonicImageViewerModule, NgChartsModule];
@NgModule({
  imports: [ThirdPartyComponents],
  exports: [ThirdPartyComponents],
})
export class ThirdPartyModule {}
