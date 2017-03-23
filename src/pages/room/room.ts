import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RoomService } from '../../app/services/room.service';
import { SwitchPage } from '../switch/switch';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private rs: RoomService, private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
    this.rs.getAllRooms(this.roomDetails.location).subscribe(res => {
      this.rooms = res;
      console.log(res);
    });
  }

  openRoom(roomName:any, location:any)
  {
    this.navCtrl.push(SwitchPage,{'room':roomName,'location':location});
  }
  delete(x)
    {
    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this room?',
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
          this.rs.deleteRoom(this.roomDetails.location,x).subscribe(res=>{console.log(res)});
          this.ionViewDidLoad();
          console.log('Room Deleted');
        }
      }
    ]
  });
  alert.present();
      
    }

}
