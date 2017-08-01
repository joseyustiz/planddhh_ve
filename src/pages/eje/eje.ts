import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import 'rxjs/add/operator/map'; //Reactive Extensions Library for JavaScript

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
  ejes = [];

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.http.get('assets/data/ejes&lineas.json')
      .map(res => res.json().filter((item) => {
        return item.slug === navParams.get('eje')
      }))
      .subscribe(
        data => {
          this.ejes = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los ejes y lineas completadas ' + this.ejes) // complete
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EjePage');
  }

}
