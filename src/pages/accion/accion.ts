import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import { IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
/**
 * Generated class for the AccionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-accion',
  templateUrl: 'accion.html',
})
export class AccionPage {
  accion:any;
  etiquetas:any;
  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams, platform: Platform,  ga: GoogleAnalytics) {
    this.accion=navParams.get("accion");
    this.http.get('assets/data/filtros.json')
      .map(res => {
        return res.json().filtros.filter((item) => {
          return this.accion.filtros.indexOf(item.slug)>=0
        })
      })
      .subscribe(
        data => {
          this.etiquetas = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de las etiquetas ' + this.etiquetas.toString()) // complete
      );

    //Google Analytics
    platform.ready().then(() => { ga.trackView("Detalle de Acción "+this.accion.numero); });
    // this.ga.startTrackerWithId('UA-105882371-1')
    //   .then(() => {this.ga.trackView("Detalle de Acción "+this.accion.numero);})
    //   .catch(e => console.log('Error starting GoogleAnalytics', e));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccionPage');
  }

}
