import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import 'rxjs/add/operator/map'; //Reactive Extensions Library for JavaScript
// import {AccionPage} from '../accion/accion'; //lazy load
import {SocialSharing} from '@ionic-native/social-sharing';
import { IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
@IonicPage()
/**
 * Generated class for the LineaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-linea',
  templateUrl: 'linea.html',
})
export class LineaPage {
  linea: any;
  acciones: any;
  tituloEje: string;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing, platform: Platform,   ga: GoogleAnalytics) {
    this.linea = navParams.get("linea");
    this.tituloEje = navParams.get("eje");
    this.http.get('assets/data/acciones.json')
      .map(res => {
        return res.json().acciones.filter((item) => {
          return item.numero.indexOf(this.linea.numero + ".") >= 0
        })
      })
      .subscribe(
        data => {
          this.acciones = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de acciones completadas ' + this.acciones.toString()) // complete
      );
    platform.ready().then(() => { ga.trackView("Eje "+this.tituloEje+" - "+this.linea.titulo); });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineaPage');
  }

  accionSeleccionada(accion) {
    this.navCtrl.push('AccionPage', {
        accion: accion
      }
    );
    console.log(accion);
  }

  compartirAccion(accion, titulo, archivo, url) {
    this.socialSharing.share(accion,titulo,archivo,url)
      .then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }
}
