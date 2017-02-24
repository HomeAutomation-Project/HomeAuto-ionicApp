import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class UtilService
{
    constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController){
        //todo
    }
        
    Loading(msg?: string) {
        let loader = this.loadingCtrl.create({
        content: msg||"Please wait..."
        });
        //loader.present();
        return loader;
    }

    Alert(Title:string, SubTitle?:string) {
        let alert = this.alertCtrl.create({
        title: Title,
        subTitle: SubTitle||'Success',
        buttons: ['OK']
        });
        alert.present();
    }
}