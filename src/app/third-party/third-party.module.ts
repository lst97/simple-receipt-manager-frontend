import { NgModule } from '@angular/core';

// Chart.js
import { NgChartsModule } from 'ng2-charts';
const ThirdPartyComponents = [NgChartsModule];
@NgModule({
  imports: [ThirdPartyComponents],
  exports: [ThirdPartyComponents],
})
export class ThirdPartyModule {}
