import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name:'add-location'
})
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  savedLocations:any;
  addLocationForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public formBuilder: FormBuilder,
    public toast: Toast,
    public navParams: NavParams)
  {
    this.addLocationForm = formBuilder.group({
      number: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]*')])],
      title: ['',Validators.compose([Validators.required,Validators.maxLength(50)])],
      description: ['',Validators.compose([Validators.required,Validators.maxLength(255)])]
    });

    this.nativeStorage.getItem('locations').then(
      (data) => {
        this.savedLocations = data;
      },
      (error) => {
        this.toast.show(error.message, 'short', 'center');
      }
    );
  }

  save() {
    if (!this.savedLocations)
      this.savedLocations = [];

    this.savedLocations.push({
      number: this.addLocationForm.value.number,
      title: this.addLocationForm.value.title,
      description: this.addLocationForm.value.description
    });
    this.nativeStorage.setItem('locations',this.savedLocations).then(
      ()=> {
        this.toast.show('New Location Saved', 'short', 'center');
        this.navCtrl.popToRoot();
      },
      (error)=>{this.toast.show(error, 'short', 'center')}
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

}
