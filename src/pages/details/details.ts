import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  @ViewChild(Content) content: Content;
  public item:any;
  public departures:any = {buses:[], metros:[], trains:[]};
  public selectedType: string = 'buses';
  public loader:any;
  public error:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public api: ApiProvider) {
    this.item = this.navParams.get('item');
  }

  ionViewDidEnter() {
    this.item = this.navParams.get('item');
    this.content.resize();
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.api.getLocation(this.item.id).then((response) => {
      //console.log(response[0].SiteId);
      let siteId = response[0].SiteId;
      this.api.getRealTime(siteId).then((response) => {
        this.loader.dismiss();
        this.departures.buses = this.api.buses;
        this.departures.metros = this.api.metros;
        this.departures.trains = this.api.trains;
        //console.log(this.departures);
      });
    }).catch((error) => {
      console.log('details.ts 37 ', error);
      this.error = 'No API key';
      this.loader.dismiss();
    });
  }

}
