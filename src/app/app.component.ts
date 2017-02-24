import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Settings} from '../pages/settings/settings';
import { Schedule } from '../pages/schedule/schedule';
import {Dashboard} from '../pages/dashboard/dashboard';
import {Account} from '../pages/account/account';
import {Location} from '../pages/location/location';
import {Login} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import { myhttpService } from './services/myhttp.service'

@Component({
  templateUrl: 'app.html',
  providers:[myhttpService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Dashboard;

  pages: Array<{title: string, component: any, icon: String}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: Dashboard, icon:'home' },
      { title: 'Account Details', component: Account, icon:'contact' },
      { title: 'Location', component: Location, icon:'jet' },
      { title: 'Schedule', component: Schedule, icon:'timer' },
      { title: 'Settings', component: Settings, icon:'settings' },
      { title: 'Login' , component:Login, icon:'key'},
      { title: 'Sign Up' , component:SignupPage, icon:'key'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
