import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import 'rxjs/add/operator/map'; //Reactive Extensions Library for JavaScript
// import {LineaPage} from '../linea/linea'; lazy load
import { IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
@IonicPage()
/**
 * Generated class for the EjePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-eje',
  templateUrl: 'eje.html',
})
export class EjePage {
  eje: any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams, platform: Platform,  ga: GoogleAnalytics) {
    this.http.get('assets/data/ejes.json')
      .map(res => {
        return res.json().ejes.filter((item) => {
          return item.numero === navParams.get('eje')
        })
      })
      .subscribe(
        data => {
          this.eje = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los ejes y lineas completadas ' + this.eje.toString()) // complete
      );
    platform.ready().then(() => { ga.trackView("Detalle del Eje "+navParams.get('eje')); });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EjePage');
  }
  lineaSeleccionada(linea,titiloEje){
    this.navCtrl.push('LineaPage', {
        linea: linea, eje:titiloEje
      }
    );
      console.log(linea);

  }

}
