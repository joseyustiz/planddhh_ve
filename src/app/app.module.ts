import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { EjesPage } from '../pages/ejes/ejes';
// import { EjePage } from '../pages/eje/eje'; //lazy load
// import { AccionesPage } from '../pages/acciones/acciones'; //Lazy Load
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { ConstruccionPage } from '../pages/construccion/construccion'; //Lazy load
//import {InvitarPage} from "../pages/invitar/invitar";//lazy load
// import {AccionPage} from "../pages/accion/accion"; //lazy load
// import {LineaPage} from "../pages/linea/linea"; //lazy load
// import {FiltrosPage} from "../pages/filtros/filtros";//lazy load
// import {InformacionPage} from "../pages/informacion/informacion";//lazy load
// import {ConstruccionDetallePage} from '../pages/construccion-detalle/construccion-detalle'; //Lazy load
import {ConstruccionIndicePage} from '../pages/construccion-indice/construccion-indice';


import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { ArticulosConstruccionProvider } from '../providers/articulos-construccion/articulos-construccion';

@NgModule({
  declarations: [
    MyApp,
    // EjesPage, //Lazy load
    // EjePage, //lazy load
    // AccionesPage, //Lazy load
    HomePage,
    TabsPage,
    // ConstruccionPage, //Lazy load
    //InvitarPage, //lazy load
    // AccionPage, //lazy load
    // LineaPage,//lazy load
    // FiltrosPage,//lazy load
    // InformacionPage,//lazy load
    // ConstruccionDetallePage, //Lazy load
    ConstruccionIndicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // EjesPage, //Lazy load
    // EjePage, //lazy load
    // AccionesPage, //Lazy load
    HomePage,
    TabsPage,
    // ConstruccionPage, //Lazy load
    //InvitarPage, //lazy load
    // AccionPage,//lazy load
    // LineaPage,//lazy load
    // FiltrosPage,//lazy load
    // InformacionPage,//lazy load
    // ConstruccionDetallePage, //Lazy Load
    ConstruccionIndicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArticulosConstruccionProvider,
    GoogleAnalytics
  ]
})
export class AppModule {}
