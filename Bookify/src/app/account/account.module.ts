import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserInformationComponent} from './user-information/user-information.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationSettingsComponent} from './notification-settings/notification-settings.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {AccountComponent} from "./account/account.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';


@NgModule({
  declarations: [
    AccountComponent,
    UserInformationComponent,
    NotificationsComponent,
    NotificationSettingsComponent,
    PasswordChangeDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    AccountComponent

  ]
})
export class AccountModule {
}
