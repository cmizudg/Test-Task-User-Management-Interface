import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserInviteComponent } from './user-invite/user-invite.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserSettingsComponent,
    UserInviteComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UsersModule { }
