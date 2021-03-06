import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem, MatInput } from '@angular/material';

import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';
import { AuthService } from '../auth/auth.service';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji/public_api';

@Component({
    selector: 'tcc-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, AfterViewInit {
    public showEmoji = false;
    action = Action;
    user: User;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;
    dialogRef: MatDialogRef<DialogUserComponent> | null;
    defaultDialogUserParams: any = {
    disableClose: true,
        data: {
            title: 'Welcome',
            dialogType: DialogUserType.NEW
        }
    };

    // getting a reference to the overall list, which is the parent container of the list items
    @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

    // getting a reference to the items/messages within the list
    @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

    constructor(private socketService: SocketService,
    public dialog: MatDialog, private auth: AuthService) { }

    ngOnInit(): void {
        this.initModel();
        // Using timeout due to https://github.com/angular/angular/issues/14748
        setTimeout(() => {
            this.checkIfLoggedin();
        }, 0);
    }

    ngAfterViewInit(): void {
        // subscribing to any changes in the list of items / messages
        this.matListItems.changes.subscribe(elements => {
            this.scrollToBottom();
        });
    }

    public addEmoji(emoji: EmojiEvent): void {
        console.log(emoji);
        if (this.messageContent === undefined || this.messageContent === null) {
            this.messageContent = emoji.emoji.native;
        } else {
            this.messageContent += emoji.emoji.native;
        }
    }

    private checkIfLoggedin(): void {
        if (this.isLoggedIn()) {
            this.user.name = localStorage.getItem('nickname');
            this.initIoConnection();
            this.sendNotification({}, Action.JOINED);
        } else {
            this.dialog.open(DialogInfoComponent, {
                data: {
                    title: 'Not logged in',
                    body: 'Please use the sidebar to login'
                }
            });
        }
    }

    public isLoggedIn(): boolean {
        return this.auth.isAuthenticated();
    }

    // auto-scroll fix: inspired by this stack overflow post
    // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
    private scrollToBottom(): void {
        try {
            this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

    private initModel(): void {
        const randomId = this.getRandomId();
        this.user = {
            id: randomId,
            avatar: localStorage.getItem('picture')
        };
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: Message) => {
            this.messages.push(message);
            });


        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
            console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
            console.log('disconnected');
            });
    }

    private getRandomId(): number {
        return Math.floor(Math.random() * (1000000)) + 1;
    }

    public onClickUserInfo() {
        this.openUserPopup({
            data: {
            username: this.user.name,
            title: 'Edit Details',
            dialogType: DialogUserType.EDIT
            }
        });
    }

    private openUserPopup(params): void {
        this.dialogRef = this.dialog.open(DialogUserComponent, params);
        this.dialogRef.afterClosed().subscribe(paramsDialog => {
            console.log(paramsDialog);
            if (!paramsDialog) {
            return;
            }

            this.user.name = paramsDialog.username;
            if (paramsDialog.dialogType === DialogUserType.NEW) {
            this.initIoConnection();
            this.sendNotification(paramsDialog, Action.JOINED);
            } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
            this.sendNotification(paramsDialog, Action.RENAME);
            }
        });
    }

    public sendMessage(message: string): void {
        this.showEmoji = false;
        console.log(message);
        if (!message) {
            console.log('message is null');
            return;
        }

        this.socketService.send({
            from: this.user,
            content: message
        });
        this.messageContent = null;
    }

    public sendNotification(params: any, action: Action): void {
        let message: Message;

        if (action === Action.JOINED) {
            message = {
            from: this.user,
            action: action
            }
        } else if (action === Action.RENAME) {
            message = {
            action: action,
            content: {
                username: this.user.name,
                previousUsername: params.previousUsername
            }
            };
        }

        this.socketService.send(message);
    }
}
