import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public settingsForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public storage: Storage, public api: ApiProvider) {
    this.api.getAllKeys().then(() => {
        this.settingsForm = formBuilder.group({
          nearbyKey: [this.api.nearby_api],
          locationsKey: [this.api.locations_api],
          realtimeKey: [this.api.realtime_api]
        });
      });
  }

  saveSettings() {
    let nearby_key = this.settingsForm.controls['nearbyKey'].value;
    let locations_key = this.settingsForm.controls['locationsKey'].value;
    let realtime_key = this.settingsForm.controls['realtimeKey'].value;

    this.storage.set('nearby_key', nearby_key);
    this.storage.set('locations_key', locations_key);
    this.storage.set('realtime_key', realtime_key);
  }

}
