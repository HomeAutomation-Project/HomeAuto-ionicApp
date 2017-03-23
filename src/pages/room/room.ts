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
  edit(room:string) {
    let prompt = this.alertCtrl.create({
      title: 'Enter Room Name',
      message: "Enter a new name for "+room,
      inputs: [
        {
          name: 'Name',
          placeholder: "Eg. "+room
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data.Name);
            this.rs.editName(this.roomDetails.location, room, data.Name).subscribe(res=>{
              console.log(res)
              this.ionViewDidLoad();
            });
          }
        }
      ]
    });
    prompt.present();
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
         
          console.log('Room Deleted');
           this.ionViewDidLoad();
        }
      }
    ]
  });
  alert.present();
      
    }

}
