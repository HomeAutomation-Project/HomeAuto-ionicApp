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
  public states = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ss:SwitchService) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SwitchPage');
    this.ss.getAllSwitches(this.roomDetails.location,this.roomDetails.room).subscribe(res=>{
      this.switches=res;
      for(let i=0; i<res.length; i++)
        this.states[i]=this.getStatus(res[i].status);
      console.log(res);
    });
    //console.log(this.roomDetails);
  }

  
    getStatus(x)
    {
      console.log(x)
      if(x == 'ON')
        {
          console.log("ON Executed")
          return true;
        }
      else
      {
         return false;
      }
    }

}
