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
import {InvitarPage} from "../pages/invitar/invitar";
import {AccionPage} from "../pages/accion/accion";
import {LineaPage} from "../pages/linea/linea";
import {FiltrosPage} from "../pages/filtros/filtros";
import {InformacionPage} from "../pages/informacion/informacion";
import {ConstruccionDetallePage} from '../pages/construccion-detalle/construccion-detalle';

import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    EjesPage,
    EjePage,
    AccionesPage,
    HomePage,
    TabsPage,
    ConstruccionPage,
    InvitarPage,
    AccionPage,
    LineaPage,
    FiltrosPage,
    InformacionPage,
    ConstruccionDetallePage
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
    InvitarPage,
    AccionPage,
    LineaPage,
    FiltrosPage,
    InformacionPage,
    ConstruccionDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
