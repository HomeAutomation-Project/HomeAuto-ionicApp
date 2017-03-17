import { Component } from '@angular/core';
import { LocationService } from '../../app/services/location.service';   
import { NavController } from 'ionic-angular';
import { RoomPage } from '../room/room';
@Component({
  selector: 'location',
  templateUrl: 'location.html'
})
export class Location {

  public locations:any;
  constructor(public navCtrl: NavController, private loc:LocationService) {
    this.locations=[];
    this.loc.getLocationDetails().subscribe(res=>{console.log(res)
    this.locations=res;
  });
  
  }

  openRoom(loc:any){
    this.navCtrl.push(RoomPage,{"location":loc})
  }
}
