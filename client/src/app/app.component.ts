import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'tcc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public channelName = '#GeneralDev';

    constructor(public auth: AuthService) {
        auth.handleAuthentication();
    }

    public logout(): void {
        this.auth.logout();
    }

    public login(): void {
        this.auth.login();
    }

    public selectChannel(channelName: string): void {
        this.channelName = channelName;
    }

    public isLoggedIn(): boolean {
        return this.auth.isAuthenticated();
    }


}
