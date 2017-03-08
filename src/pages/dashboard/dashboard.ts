import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { UtilService } from '../../app/services/util.service';

import { Login } from '../login/login';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  constructor(public navCtrl: NavController, private ls: LoginService, private us: UtilService) {
    if(!this.ls.isLoggedIn())
    {
      this.us.Alert("You are not logged in!", "Please Log in");
      this.navCtrl.setRoot(Login);
    }
  }

}
