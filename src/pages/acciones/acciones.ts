import {Component, Renderer} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
//import {AccionPage} from '../accion/accion';//lazy load
import {SocialSharing} from '@ionic-native/social-sharing';
// import {FiltrosPage} from "../filtros/filtros";
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

import * as _ from "lodash";
import { IonicPage } from 'ionic-angular';
@IonicPage()

@Component({
  selector: 'page-contact',
  templateUrl: 'acciones.html'
})
export class AccionesPage {
  acciones = [];
  filtrado: boolean;
  accionesFiltradas: any;
  tags: any; //almacena los tags seleccionado como filtros
  contadorTags: any;
  filtroTexto:string;
  spinner:boolean;
  numberOfItemsToDisplay:number = 10;

  searchControl: FormControl;

  constructor(private renderer:Renderer, private http: Http, public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing, public modalCtrl: ModalController) {
    this.filtrado = false;
    this.contadorTags = 0;
    this.tags = [];
    this.filtroTexto="";
    this.searchControl = new FormControl();
    this.spinner=false;

  }

  ionViewDidLoad() {
    this.cargarAcciones();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      console.log('con espera de 30000');
      this.filtrarAcciones();
    });

  }

  onSearchInput(){
    this.filtrado = true;
    this.spinner=true;

  }

    cargarAcciones() {
      console.log('cargando acciones');
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
    this.navCtrl.push('AccionPage', {
        accion: accion
      }
    );
    console.log(accion);
  }

  filtrarAcciones() {
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
    this.spinner=false;
  }

  borradoFiltroTexto(ev) {
    if (this.contadorTags===0){
      this.filtrado = false;
      console.log('Filtro borrado');
    }
  }

  presentarFiltros(ev) {
    let filtrosModal = this.modalCtrl.create('FiltrosPage',
                      {tags: this.tags, contador: this.contadorTags});
    filtrosModal.onDidDismiss((data) => {
        if (data) {
          this.tags = data.d;
          this.contadorTags = data.cont;
          this.filtrarAcciones();
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
    this.filtrarAcciones();
    console.log("tags despues de remover =" + this.tags);
  }

  limpiarFiltros(ev) {
    this.filtroTexto="";
    this.tags=[];
    this.contadorTags=0;
    this.filtrado=false;
  }
  itentificarAccion(index, item){
    console.log("llamada identificarAccion = " , index, item);
    return item.numero;

  }

  onSearch(event) {
    this.renderer.invokeElementMethod(event.target, 'blur');
  }

  doInfiniteNoFiltrado(infiniteScroll){
    setTimeout(() => {
      if (this.acciones.length > this.numberOfItemsToDisplay)
        this.numberOfItemsToDisplay += 10; // load 20 more items
      infiniteScroll.complete();
    }, 300);
  }


}
