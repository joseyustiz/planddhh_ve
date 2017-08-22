import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {AccionPage} from '../accion/accion';
import {SocialSharing} from '@ionic-native/social-sharing';
import {FiltrosPage} from "../filtros/filtros";
import * as _ from "lodash";

@Component({
  selector: 'page-contact',
  templateUrl: 'acciones.html'
})
export class AccionesPage {
  acciones: any;
  filtrado: boolean;
  accionesFiltradas: any;
  tags: any; //almacena los tags seleccionado como filtros
  contadorTags: any;
  filtroTexto:string;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing, public modalCtrl: ModalController) {
    this.cargarAcciones();
    this.filtrado = false;
    this.contadorTags = 0;
    this.tags = [];
    this.filtroTexto="";
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
        // () => console.log('Lectura de acciones completadas ' + this.acciones.toString()) // complete
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
    console.log("filtro de texto tiene contenido ='"+this.filtroTexto+"'");
    var soloTags=this.tags.map((item)=>{return item.slug});
    // var val = ev.target.value;
    // var val = this.filtroTexto;
    if (this.filtroTexto && this.filtroTexto.trim() != '') {
      if (this.contadorTags === 0) {
        // filtando solo por texto
        console.log("se metió en solo por texto");
        this.accionesFiltradas = this.acciones
          .filter((item) => {
            return (item.descripcion.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0);
          });
      } else {
        //filtando por texto y tags
        console.log("texto de busqueda: "+this.filtroTexto +" y tags: "+soloTags);
        this.accionesFiltradas = this.acciones
          .filter((item) => {
            return (item.descripcion.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0 &&
            _.intersection(item.filtros,soloTags).length === soloTags.length);
          });
      }
      this.filtrado = true;
    }
    else {
      if (this.contadorTags === 0) {
        this.filtrado = false;
        this.accionesFiltradas=this.acciones;
        // ningun filtro
        console.log("se metió por ningun filtro");
        console.log("Contenido de acciones"+this.acciones);
      } else {
        // filtrando por solo filtros
        console.log("se metió solo filtros");
          this.accionesFiltradas = this.acciones
          .filter((item) => {
            return _.intersection(item.filtros,soloTags).length === soloTags.length;
          });
        this.filtrado = true;
      }
    }
  }

  borradoFiltroTexto(ev) {
    if (this.contadorTags===0){
      this.filtrado = false;
      console.log('Filtro borrado');
    }
  }

  presentarFiltros(ev) {
    let filtrosModal = this.modalCtrl.create(FiltrosPage,
                      {tags: this.tags, contador: this.contadorTags});
    filtrosModal.onDidDismiss((data) => {
        if (data) {
          this.tags = data.d;
          this.contadorTags = data.cont;
          this.filtrarAcciones(ev);
          console.log("despues de llamar a filtrar acciones = " + this.contadorTags);
        }
      }
    );
    filtrosModal.present();
  }

  borrarFiltro(el: Element, slug) {
    console.log("tags antes de remover =" + this.tags);

    el.remove();
    this.tags=this.tags.filter((x) => {
      return x.slug === slug ? false : true
    });
    this.contadorTags--;
    this.filtrarAcciones(event);
    console.log("tags despues de remover =" + this.tags);
  }

  limpiarFiltros(ev) {
    this.filtroTexto="";
    this.tags=[];
    this.contadorTags=0;
    this.filtrado=false;
  }
  itentificarAccion(accion){
    console.log("llamada identificarAccion = " + accion.id);
    return accion.id;

  }
}
