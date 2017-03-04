import { Component } from '@angular/core';
import { AccountService } from '../../app/services/account.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class Account {

  constructor(public navCtrl: NavController, private acc:AccountService) {
        this.acc.getAccountDetails().subscribe(res=>{console.log(res)});
          
  }

}
