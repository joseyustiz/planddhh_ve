import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {SocialSharing} from '@ionic-native/social-sharing';
import {ConstruccionDetallePage} from '../construccion-detalle/construccion-detalle';


/**
 * Generated class for the ConstruccionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-construccion',
  templateUrl: 'construccion.html',
})
export class ConstruccionPage {
  articulos: any;
  filtrado: boolean;
  articulosFiltrados: any;
  tags: any; //almacena los tags seleccionado como filtros
  contadorTags: any;
  filtroTexto:string;

  constructor(private http: Http, private socialSharing: SocialSharing,
              public navCtrl: NavController, public navParams: NavParams) {
    this.cargarArticulos();
    this.filtrado = false;
    this.contadorTags = 0;
    this.tags = [];
    this.filtroTexto="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstruccionPage');
  }
  cargarArticulos() {
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion
      })
      .subscribe(
        data => {
          this.articulos = data;
        },
        err => console.log("error es " + err), // error
        // () => console.log('Lectura de acciones completadas ' + this.acciones.toString()) // complete
      );
  }

  compartirArticulo(accion, titulo, archivo, url) {
    this.socialSharing.share(accion, titulo, archivo, url)
      .then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  articuloSeleccionado(articulo) {
    this.navCtrl.push(ConstruccionDetallePage, {
        articulo: articulo
      }
    );
  }



}
