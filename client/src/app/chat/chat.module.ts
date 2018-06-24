import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';

import { ChatComponent } from './chat.component';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PickerModule
  ],
  declarations: [ ChatComponent, DialogUserComponent, DialogInfoComponent ],
  providers: [ SocketService ],
  entryComponents: [ DialogUserComponent, DialogInfoComponent ]
})
export class ChatModule { }
