import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class ApiProvider {
  private url:string = "api2/";
  public nearby_api:string = "";
  public locations_api:string = "";
  public realtime_api:string = "";

  public buses:any;
  public trains:any;
  public metros:any;
  
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Api Provider');
    this.getAllKeys();
  }

  getAllKeys() {
    return new Promise((resolve, reject) => {
      this.getNearbyKey();
      this.getLocationKey();
      this.getRealTimeKey();
      resolve();
    });
  }

  getNearbyKey() {
    return new Promise((resolve, reject) => {
      this.storage.get('nearby_key').then((val) => {
        this.nearby_api = val;
        resolve(val);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getLocationKey() {
    return new Promise((resolve, reject) => {
      this.storage.get('locations_key').then((val) => {
        this.locations_api = val;
        resolve(val);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getRealTimeKey() {
    return new Promise((resolve, reject) => {
      this.storage.get('realtime_key').then((val) => {
        this.realtime_api = val;
        resolve(val);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getNearbyStops(latitude:number, longitude:number, maxResult:number = 15, radius:number = 1500) {
    return new Promise((resolve, reject) => {
      if(this.nearby_api == null) {
        reject('No Api key');
      }

      let url = this.url+'nearbystops.json?key=' + this.nearby_api;
      url += '&originCoordLat='+latitude+'&originCoordLong='+longitude;
      url += '&maxresults='+maxResult+'&radius='+radius;

      this.http.get(url).map(res => res.json()).subscribe(data => {
        resolve(data.LocationList.StopLocation);
      },(error) => {
        reject(error);
     });


    });

  }

  getLocation(id:number) {
    return new Promise((resolve, reject) => {
      if(this.locations_api == null) {
        reject('No API key');
      }

      let url = this.url + 'typeahead.json?key='+this.locations_api;
      url += '&searchstring='+id;
      url += '&stationsonly=true&maxresults=20';
      this.http.get(url).map(res => res.json()).subscribe(data => {
        resolve(data.ResponseData);
      },(error) => {
        reject(error);
      })

    });
  }

  getRealTime(id:number) {
    return new Promise((resolve, reject) => {
      if(this.realtime_api == null) {
        reject('No API key');
      }

      let url = this.url + 'realtimedeparturesV4.json?key='+this.realtime_api;
      url += '&siteid='+id;
      url += '&timewindow=60&tram=false&ship=false';
      this.http.get(url).map(res => res.json()).subscribe(data => {
        this.buses = data.ResponseData.Buses;
        this.trains = data.ResponseData.Trains;
        this.metros = data.ResponseData.Metros;
        resolve();
      },(error) => {
        reject(error);
      })

    });
  }

}
