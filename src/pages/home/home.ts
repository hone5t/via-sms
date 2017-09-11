import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { AlertController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
public items: Array<{ title: string,number:number, description:string }>;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    private androidPermissions: AndroidPermissions,
    private sms: SMS) {
      this.nativeStorage.getItem('locations').then(
        (data) => {
          this.items = data;
        },
        (error) => {
          this.items = [];
        }
      );
  }

  addLocation(){
    this.navCtrl.push('add-location');
  }
  doSendSmsNow(num){
      this.sms.send('52020', num).then(()=>{
          let alert = this.alertCtrl.create({
            message: "SMS Sent",
            buttons : [{
            text: 'Ok',
            role: 'cancel'
            }]
         });
         alert.present();
    });
  }


  sendSms(num){
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.CALL_PHONE]);
    this.doSendSmsNow(num);
  }
}
