import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Switch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-switch',
  templateUrl: 'switch.html'
})
export class SwitchPage {
  public roomDetails = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwitchPage');
    console.log(this.roomDetails);
  }

}
