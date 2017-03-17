import { Component } from '@angular/core';
import { AccountService } from '../../app/services/account.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class Account {
  public user: any={};
  constructor(public navCtrl: NavController, private acc:AccountService) {
        this.user.username ="";
        this.user.first="";
        this.user.last="";
        this.user.email="";
        this.acc.getAccountDetails().subscribe(res=>{
          console.log(res);
          this.user.first = res.name.first;
          this.user.last = res.name.last;
          this.user.username = res.username;
          this.user.email =res.email;
        });
          
  }
  

}
