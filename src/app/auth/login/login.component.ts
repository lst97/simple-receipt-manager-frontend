import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { UserLoginEvent } from 'src/app/services/event-bus/events/user-login.event';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  message: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    private eventBusService: EventBusService
  ) {
    this.message = this.getMessage();
  }

  username: string = '';
  password: string = '';

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        this.eventBusService.publish(new UserLoginEvent());

        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.

        this.router.navigate(['/admin']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
