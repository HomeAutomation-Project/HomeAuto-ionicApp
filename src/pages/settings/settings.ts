import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class Settings {
    protocol: boolean; URL: string;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController) {
    this.getDefaults();
  }

  getDefaults()
  {
      if(localStorage.getItem('protocol') != null)
      {this.protocol = localStorage.getItem('protocol') == '1' ? true : false; }
      else{
          this.protocol = false;
      }

      if(localStorage.getItem('url') != null)
      {this.URL = localStorage.getItem('url'); }
      else{
          this.URL = 'auto.amanvishnani.com/api';
      }
  }

  setDefaults()
  {
      localStorage.setItem('url', this.URL);
      localStorage.setItem('protocol', this.protocol ? '1' : '0');
      this.presentAlert();
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Settings',
    subTitle: 'Settings Saved Successfully!',
    buttons: ['Okay!']
  });
  alert.present();
}
}