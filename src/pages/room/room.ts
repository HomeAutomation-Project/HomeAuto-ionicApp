import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomService } from '../../app/services/room.service';
/*
  Generated class for the Room page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {

  public roomDetails = this.navParams.data;
  public rooms: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private rs: RoomService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
    this.rs.getAllRooms(this.roomDetails.location).subscribe(res => {
      this.rooms = res;
      console.log(res);
    });
  }

  openRoom(roomName:any)
  {
    //this.navCtrl.push(SwitchPage,{'room':roomName});
  }

}
