import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
@IonicPage()
/**
 * Generated class for the InformacionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, platform: Platform,  ga: GoogleAnalytics) {
    platform.ready().then(() => { ga.trackView("Pag. Información"); });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }
  abrirUrlConNavegador(url){
    console.log("Abrir URL: "+url);
    const browser = this.iab.create(url,"_system");
    browser.close();
  }
}
