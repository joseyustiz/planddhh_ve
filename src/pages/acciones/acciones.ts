import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {AccionPage} from '../accion/accion';
import {SocialSharing} from '@ionic-native/social-sharing';

@Component({
  selector: 'page-contact',
  templateUrl: 'acciones.html'
})
export class AccionesPage {
  acciones: any;
  filtrado:boolean;
  accionesFiltradas:any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing) {
    this.cargarAcciones();
    this.filtrado=false;
  }

  cargarAcciones() {
    this.http.get('assets/data/acciones.json')
      .map(res => {
        return res.json().acciones
      })
      .subscribe(
        data => {
          this.acciones = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de acciones completadas ' + this.acciones.toString()) // complete
      );

  }

  compartirAccion(accion, titulo, archivo, url) {
    this.socialSharing.share(accion, titulo, archivo, url)
      .then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  accionSeleccionada(accion) {
    this.navCtrl.push(AccionPage, {
        accion: accion
      }
    );
    console.log(accion);
  }

  filtrarAcciones(ev) {
   // this.cargarAcciones();

    var val = ev.target.value;
    if (val && val.trim() != '') {
      console.log("filtando contenido");
      this.accionesFiltradas = this.acciones
        .filter((item) => {
          // return (item.numero.toLowerCase().indexOf(val.toLowerCase()) >= 0);
          return (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) >= 0);
        })
      this.filtrado=true;
      // console.log('Acciones filtradas ' + this.acciones)
    }else {
      this.filtrado=false;

    }
  }
  borradoFiltro(ev){
    this.filtrado=false;
    console.log('Filtro borrado' );
  }
}
