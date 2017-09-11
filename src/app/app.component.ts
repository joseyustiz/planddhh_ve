import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private ga: GoogleAnalytics) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Configurar Google Analytics trackID
      this.ga.startTrackerWithId("UA-105882371-1");

      this.ga.enableUncaughtExceptionReporting(true).then((_success) => {
        console.log("Successful enabling of uncaught exception reporting "+_success)
      }).catch((_error) => {
        console.log("error occured "+_error)
      });
    });
  }
}
