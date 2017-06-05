import { Component } from '@angular/core';
import { ScheduleService } from '../../app/services/schedule.service';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddScheduleModal } from './modal';
import { ActionSheetController } from 'ionic-angular';
import { EditScheduleModal } from "./edit-modal";

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class Schedule {
  public tasks:any;

  constructor(public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private sch:ScheduleService, 
              private modalCtrl:ModalController) {
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
  doAction(task)
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your task',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Edit',
          handler: () => {
            console.log('Edit clicked' + JSON.stringify(task));
            let modal = this.modalCtrl.create(EditScheduleModal,task);
            modal.present();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
