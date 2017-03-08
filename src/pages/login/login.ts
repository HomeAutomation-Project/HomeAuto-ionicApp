import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard'

import { LoginService } from '../../app/services/login.service';
import { UtilService } from '../../app/services/util.service';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login{
    public data:any = {
      user:'',
      pass:''
    };
    constructor(public navCtrl: NavController, private ls: LoginService, private us: UtilService) {

    }

    ngOnInit(){
      console.log("On Init Ran");
    }
    doLogin()
    {
      let loader = this.us.Loading();
      loader.present()
      this.ls.login(this.data.user,this.data.pass).subscribe(result =>{
        console.log(result);
        this.ls.setToken(result.token);
        loader.dismiss();
        let alert = this.us.Alert("Success", "You have been logged in!");
        this.navCtrl.setRoot(Dashboard);
      },
      error =>{
        console.log(error);
        loader.dismiss();
        let alert = this.us.Alert("Failed", "Make sure username and password are correct!");
      });
    }
}