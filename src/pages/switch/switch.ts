import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private ss:SwitchService) {}

  ionViewDidLoad(refresh) {
    //console.log('ionViewDidLoad SwitchPage');
    this.ss.getAllSwitches(this.roomDetails.location,this.roomDetails.room).subscribe(res=>{
      this.switches=res;
      console.log(res);
      if(refresh)
        refresh.complete();
    });
    //console.log(this.roomDetails);
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


}
