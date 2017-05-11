import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SthlmTravelApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    SthlmTravelApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SthlmTravelApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SthlmTravelApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
