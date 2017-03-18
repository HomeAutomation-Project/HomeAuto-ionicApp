import { Component } from '@angular/core';
import { ScheduleService } from '../../app/services/schedule.service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class Schedule {
  public tasks:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sch:ScheduleService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.tasks=[];
    this.sch.getScheduleDetails().subscribe(res=>{
      console.log(res);
      this.tasks=res;
  });
    
  }


}
