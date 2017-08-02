import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EjesPage } from '../pages/ejes/ejes';
import { EjePage } from '../pages/eje/eje';
import { AccionesPage } from '../pages/acciones/acciones';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConstruccionPage } from '../pages/construccion/construccion';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InvitarPage} from "../pages/invitar/invitar";

@NgModule({
  declarations: [
    MyApp,
    EjesPage,
    EjePage,
    AccionesPage,
    HomePage,
    TabsPage,
    ConstruccionPage,
    InvitarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EjesPage,
    EjePage,
    AccionesPage,
    HomePage,
    TabsPage,
    ConstruccionPage,
    InvitarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
