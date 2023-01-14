import { GroupViewerComponent } from './common/group-viewer/group-viewer.component';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'groups/:id', component: GroupViewerComponent },
  { path: '**', redirectTo: '/wlecome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
