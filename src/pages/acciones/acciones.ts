import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {AccionPage} from '../accion/accion';
import {SocialSharing} from '@ionic-native/social-sharing';
import {FiltrosPage} from "../filtros/filtros";

@Component({
  selector: 'page-contact',
  templateUrl: 'acciones.html'
})
export class AccionesPage {
  acciones: any;
  filtrado:boolean;
  accionesFiltradas:any;
  tags:any; //almacena los tags seleccionado como filtros

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing,public modalCtrl: ModalController) {
    this.cargarAcciones();
    this.filtrado=false;
    //TODO remover los tags de pruebas
    this.tags= {
      "filtros": [
        {
          "id": 0,
          "nombre": "Población en General",
          "descripcion": "Población en General",
          "slug": "toda-poblacion",
          "tipo": "POBLACION"
        },
        {
          "id":1,
          "nombre":"Niñ@s y Adolescentes",
          "descripcion":"Niños, Niñas y Adolescentes",
          "slug":"nna",
          "tipo":"POBLACION"
        }
      ]
    }
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

    var val = ev.target.value;
    if (val && val.trim() != '') {
      console.log("filtando contenido");
      this.accionesFiltradas = this.acciones
        .filter((item) => {
          return (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) >= 0);
        })
      this.filtrado=true;
      // console.log('Acciones filtradas ' + this.acciones)
    }else {
      this.filtrado=false;
    }
  }
  borradoFiltroTexto(ev){
    this.filtrado=false;
    console.log('Filtro borrado' );
  }

  presentarFiltros(ev){
    let filtrosModal = this.modalCtrl.create(FiltrosPage,this.tags);
    filtrosModal.present();
  }

  borrarFiltro(el:Element){
    // ev.scrElement.remove();
    el.remove();
    //TODO remover el filtro de la lista de acciones
  }
  limpiarFiltros(ev){}
}
