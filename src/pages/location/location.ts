import { Component } from '@angular/core';
import { LocationService } from '../../app/services/location.service';   
import { NavController, AlertController } from 'ionic-angular';
import { RoomPage } from '../room/room';
@Component({
  selector: 'location',
  templateUrl: 'location.html'
})
export class Location {

  public locations:any;
  constructor(public navCtrl: NavController, private loc:LocationService, private alertCtrl: AlertController) {
    this.locations=[];
  }

  ionViewDidLoad()
  {
    this.loc.getLocationDetails().subscribe(res=>{console.log(res)
    this.locations=res;
    });
  }

  openLocation(loc:any){
    this.navCtrl.push(RoomPage,{"location":loc})
  }

  edit(location:string) {
    let prompt = this.alertCtrl.create({
      title: 'Enter Location Name',
      message: "Enter a new name for "+location,
      inputs: [
        {
          name: 'Name',
          placeholder: "Eg. "+location
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
            this.loc.editName(location,data.Name).subscribe(res=>{
              console.log(res)
              this.ionViewDidLoad();
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
