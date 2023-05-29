import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: 'app-group-viewer',
  templateUrl: './group-viewer.component.html',
  styleUrls: ['./group-viewer.component.scss'],
})
export class GroupViewerComponent {}

// In the route configuration
const routes: Routes = [
  {
    path: 'protected',
    component: GroupViewerComponent,
    canActivate: [authGuard],
  },
  // Other routes...
];
