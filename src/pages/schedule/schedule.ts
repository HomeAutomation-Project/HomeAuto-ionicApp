import { Component } from '@angular/core';
import { ScheduleService } from '../../app/services/schedule.service';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
              private modalCtrl:ModalController,
              private alertCtrl: AlertController
              ) {
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
            this.delete(task.name);
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
  delete(x)
    {
    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this Task?',
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
          this.sch.deleteSchedule(x).subscribe(res=>{console.log(res)});
         
          console.log('Task Deleted');
           this.ionViewDidLoad();
        }
      }
    ]
  });
  alert.present();
      
    }
}
