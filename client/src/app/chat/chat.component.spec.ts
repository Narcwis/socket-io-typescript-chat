import { async, inject, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { SocketService } from './shared/services/socket.service';

export class MockedAuthService {
    isAuthenticaed(): boolean {
        return true
    }
}
export class MockedMatDialog {}
export class MockedSocketService {}


describe('ChatComponent', () => {
    let chatComponent;
    let authService;
    let dialog;
    let socketService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useclass: MockedAuthService },
                { provide: MatDialog, useClass: MockedMatDialog },
                { provide: SocketService, useClass: MockedSocketService }
            ]
        })
    }));

    beforeEach(inject([SocketService, MatDialog, AuthService],
        (_socketService: SocketService,
        _dialog: MatDialog,
        _authService: AuthService ) => {
        socketService = _socketService;
        dialog = _dialog;
        authService = _authService;
        chatComponent = new ChatComponent(socketService, dialog, authService);
    }));

    it('should be created', () => {
        expect(chatComponent).toBeTruthy();
    });
});
