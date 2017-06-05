import { Component } from '@angular/core';
import {  Platform, NavParams, ViewController } from 'ionic-angular';
import { LocationService } from '../../app/services/location.service';
import { LoginService } from '../../app/services/login.service';
import { RoomService } from '../../app/services/room.service';
import { SwitchService } from '../../app/services/switch.service';
import { ScheduleService } from '../../app/services/schedule.service';
import * as moment from 'moment'
@Component({
  template:`
  <ion-header>
  <ion-toolbar color="danger">
    <ion-title>
      Edit Schedule
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
            <ion-input type="text" [(ngModel)]="TaskName"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="t"></ion-datetime>
        </ion-item>
        <ion-item>
            <ion-label>Time</ion-label>
            <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="t"></ion-datetime>
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
            <button ion-button full (click)="EditTask()">Edit Schedule</button>
        </ion-item>
    </ion-list>
</ion-content>
  `,
  providers: [LocationService, LoginService, RoomService, SwitchService, ScheduleService]
})
export class EditScheduleModal {
  public t = moment(this.params.get('taskTimeDate')).add(5,'h').add(30,'m').toDate().toJSON();
  public onoff=this.params.get('status');
  public location='';
  public room='';
  public switch = '';
  public oldName = this.params.get('name');
  public TaskName = this.params.get('name');
  public date=this.t;
  public time =this.t;
  public locations =[];
  public rooms =[];
  public switches =[];
  constructor(public platform: Platform,
   public viewCtrl: ViewController,
   private ls: LocationService,
   private rs: RoomService,
   private ss: SwitchService,
   private sch: ScheduleService,
   private params: NavParams
   ){
   }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  EditTask()
  {
      let myDatetime =moment(this.t).subtract(5,'h').subtract(30,'m').toJSON();
      console.log(myDatetime)
      let data = {
          "name": this.TaskName,
          "status":this.onoff,
          "taskTimeDate": myDatetime
      }
      console.log(data);
      this.sch.editSchedule(this.oldName,data).subscribe(res=>{
          console.log(res);
          this.dismiss();
      }, err => console.log(err))
  }
}