import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { myhttpService } from '../../app/services/myhttp.service';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login{
    constructor(public navCtrl: NavController, private httpservice: myhttpService) {

    }

    ngOnInit(){
      console.log("On Init Ran");
    }
}