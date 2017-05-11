import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public latitude:number;
  public longitude:number;
  public nearbyLocations: any;
  public loader: any;
  constructor(public navCtrl: NavController, public geo: Geolocation, public api: ApiProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.geo.getCurrentPosition().then((response) => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;
      this.api.getNearbyStops(this.latitude, this.longitude).then((response) => {
        this.loader.dismiss();
        this.nearbyLocations = response;
      }).catch((error) => {
        console.log("home.ts 31: ",error);
        this.loader.dismiss();
      });
    });
  }

  showDetails(item) {
    this.navCtrl.push('DetailsPage', {item: item});
  }

}
