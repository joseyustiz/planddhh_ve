import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicPage } from 'ionic-angular';
@IonicPage()

/**
 * Generated class for the ConstruccionDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-construccion-detalle',
  templateUrl: 'construccion-detalle.html',
})
export class ConstruccionDetallePage {
  articulo:any;

  constructor(/*private http: Http,*/public navCtrl: NavController, public navParams: NavParams, platform: Platform,  ga: GoogleAnalytics) {
    this.articulo=navParams.get("articulo");
    //Google Analytics
    platform.ready().then(() => { ga.trackView("Detalle Art. Construcción: "+this.articulo.titulo); });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstruccionDetallePage');
  }

}
