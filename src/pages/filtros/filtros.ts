import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)

/**
 * Generated class for the FiltrosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filtros',
  templateUrl: 'filtros.html',
})
export class FiltrosPage {
  filtrosPoblaciones: any;
  filtrosInstituciones: any;
  filtrosDerechos: any;
  filtros:string;
  filtrosSeleccionados:any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.filtrosSeleccionados=navParams.get("filtros");
//cargar filtros de poblacion
    this.http.get('assets/data/filtros.json')
      .map(res => {
        return res.json().filtros.filter((item) => {
          return item.tipo.toUpperCase().indexOf('POBLACION') >= 0
        })
      })
      .subscribe(
        data => {
          this.filtrosPoblaciones = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los filtros completadas ' + this.filtrosPoblaciones.toString()) // complete
      );
//cargar filtros de instituciones
    this.http.get('assets/data/filtros.json')
      .map(res => {
        return res.json().filtros.filter((item) => {
          return item.tipo.toUpperCase().indexOf('INSTITUCION') >= 0
        })
      })
      .subscribe(
        data => {
          this.filtrosInstituciones = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los filtros completadas ' + this.filtrosInstituciones) // complete
      );
//cargar filtros de derecho
    this.http.get('assets/data/filtros.json')
      .map(res => {
        return res.json().filtros.filter((item) => {
          return item.tipo.toUpperCase().indexOf('DERECHO') >= 0
        })
      })
      .subscribe(
        data => {
          this.filtrosDerechos = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los filtros completadas ' + this.filtrosDerechos) // complete
      );

    this.filtros="instituciones";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrosPage');
  }
  limpiar(): void {
    // this.viewCtrl.dismiss();
  }
  cerrar(): void {
    // this.viewCtrl.dismiss();
  }

}
