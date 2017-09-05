import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {EjePage} from '../eje/eje'; //lazy load
import { IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
@IonicPage()


@Component({
  selector: 'page-ejes',
  templateUrl: 'ejes.html'
})
export class EjesPage {
  constructor(public navCtrl: NavController, platform: Platform,  ga: GoogleAnalytics) {
    platform.ready().then(() => { ga.trackView("Listado de Ejes"); });

  }

  itemSeleccionado(ejeN) {
    console.log("eje # "+ ejeN);
    this.navCtrl.push('EjePage', {
        eje: ejeN
      }
    );
  }
}

