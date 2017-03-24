import { Component } from '@angular/core';
import { ScheduleService } from '../../app/services/schedule.service';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddScheduleModal } from './modal';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class Schedule {
  public tasks:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sch:ScheduleService, private modalCtrl:ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.tasks=[];
}
ionViewDidLoad(refresh?:any)
{
  this.sch.getScheduleDetails().subscribe(res=>{
      console.log(res);
      this.tasks=res;
      if(refresh)
        refresh.complete();
  });
}
  addTask()
  {
    let modal = this.modalCtrl.create(AddScheduleModal);
    modal.present();
  }
}
