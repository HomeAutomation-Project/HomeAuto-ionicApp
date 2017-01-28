import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Location } from '../pages/location/location';
import { Schedule } from '../pages/schedule/schedule';
import {Dashboard} from '../pages/dashboard/dashboard';
import {Account} from '../pages/account/account';
import {Settings} from '../pages/settings/settings';
import {Login} from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    Location,
    Schedule,
    Dashboard,
    Account,
    Settings,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Location,
    Schedule,
    Dashboard,
    Account,
    Settings,
    Login
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
