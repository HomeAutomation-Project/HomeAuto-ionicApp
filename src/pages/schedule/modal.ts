import { Component } from '@angular/core';
import {  Platform, NavParams, ViewController } from 'ionic-angular';
import { LocationService } from '../../app/services/location.service';
import { LoginService } from '../../app/services/login.service';
import { RoomService } from '../../app/services/room.service';
import { SwitchService } from '../../app/services/switch.service';

@Component({
  template:`
  <ion-header>
  <ion-toolbar color="danger">
    <ion-title>
      Add New Schedule
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
  </ion-header>
<ion-content>
    <ion-list>
        <ion-item>
            <ion-label floating>Schedule Name</ion-label>
            <ion-input type="text"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Location</ion-label>
            <ion-select [(ngModel)]="location" (ionChange)="fetchRooms()">
                <ion-option *ngFor="let l of locations" value="{{l.name}}">{{l.name}}</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Rooms</ion-label>
            <ion-select [(ngModel)]="room" (ionChange)="fetchSwitches()">
                <ion-option *ngFor="let r of rooms" value="{{r.name}}">{{r.name}}</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Switch</ion-label>
            <ion-select [(ngModel)]="switch">
                <ion-option *ngFor="let s of switches" value="{{s._id}}">{{s.SwitchName}}</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Time</ion-label>
            <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="gaming"></ion-datetime>
        </ion-item>
        <ion-item>
            <ion-label>ON/OFF/PIR</ion-label>
            <ion-select [(ngModel)]="onoff">
                <ion-option value="ON">ON</ion-option>
                <ion-option value="OFF">OFF</ion-option>
                <ion-option value="PIR">PIR</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Repeat</ion-label>
            <ion-checkbox color="dark" [checked]="repeat.do" [(ngModel)]="repeat.do"></ion-checkbox>
        </ion-item>
        <ion-item>
            <ion-label>Hourly/Daily/Weekly</ion-label>
            <ion-select [(ngModel)]="repeat.value" [disabled]="!repeat.do">
                <ion-option value="hourly">Hourly</ion-option>
                <ion-option value="daily">Daily</ion-option>
                <ion-option value="weekly">Weekly</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <button ion-button full>Add New Schedule</button>
        </ion-item>
    </ion-list>
</ion-content>
  `,
  providers: [LocationService, LoginService, RoomService, SwitchService]
})
export class AddScheduleModal {
  public repeat={do:false, value:'hourly'};
  public onoff="ON";
  public location='';
  public room='';
  public switch = '';
  public locations =[];
  public rooms =[];
  public switches =[];
  constructor(public platform: Platform,
   public viewCtrl: ViewController,
   private ls: LocationService,
   private rs: RoomService,
   private ss: SwitchService
   ){
       this.ls.getLocationDetails().subscribe(res => this.locations = res);
   }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  fetchRooms()
  {
      console.log(this.location)
      this.rs.getAllRooms(this.location).subscribe(res => this.rooms=res, err=> console.log(err));
  }
  fetchSwitches()
  {
      this.ss.getAllSwitches(this.location, this.room).subscribe(
          res => {
              this.switches = res;
              console.log(res)
          }
      )
  }
}