import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SwitchService } from '../../app/services/switch.service';

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
  public switches:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ss:SwitchService, private alertCtrl:AlertController) {}

  ionViewDidLoad(refresh?:any) {
      this.ss.getAllSwitches(this.roomDetails.location,this.roomDetails.room).subscribe(res=>{
      this.switches=res;
      console.log(res);
      if(refresh)
        refresh.complete();
    });
  }
    toggleSwitch(x,y)
    {
      this.ss.setStatus(this.roomDetails.location,this.roomDetails.room,x,!y).subscribe(res=>{console.log(res)});
    }

  
    getStatus(x)
    {
       if(x == 'ON')
        {
          return true;
        }
      else
      {
         return false;
      }
    }
    delete(x)
    {
    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this switch?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.ss.deleteSwitch(this.roomDetails.location,this.roomDetails.room,x).subscribe(res=>{console.log(res)});
          this.ionViewDidLoad();
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
      
    }


}
