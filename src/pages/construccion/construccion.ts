import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {SocialSharing} from '@ionic-native/social-sharing';
import {ConstruccionDetallePage} from '../construccion-detalle/construccion-detalle';
import * as _ from "lodash";


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
  articulosAntecedentes: any;
  articulosConstruccion: any;
  articulosResultados: any;
  // filtrado: boolean;
  // articulosFiltrados: any;
  tags: any; //almacena los tags seleccionado como filtros
  contadorTags: any;
  filtroTexto:string;
  prestagna:string;
  tipos:any= [];


  constructor(private http: Http, private socialSharing: SocialSharing,
              public navCtrl: NavController, public navParams: NavParams) {
    this.cargarArticulos();
    // this.filtrado = false;
    this.contadorTags = 0;
    this.tags = [];
    this.filtroTexto="";
    this.tipos=[{tag:"ANTECEDENTES",titulo:"Antecedentes"}, {tag:"CONSTRUCCION",titulo:"Construcción"}, {tag:"RESULTADOS",titulo:"Resultados"}];
    this.prestagna=this.tipos[0].tag;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstruccionPage');
  }
  cargarArticulos() {
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion.filter((item) =>
            {return item.tipo.toUpperCase().indexOf("ANTECEDENTES") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosAntecedentes = data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosAntecedentes.toString()) // complete
      );
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion.filter((item) =>
        {return item.tipo.toUpperCase().indexOf("CONSTRUCCION") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosConstruccion= data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosConstruccion.toString()) // complete
      );
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion.filter((item) =>
        {return item.tipo.toUpperCase().indexOf("RESULTADOS") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosResultados= data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosResultados.toString()) // complete
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
    console.log(articulo);

  }

  // filtrarArticulos(ev) {
  //   console.log("filtro de texto tiene contenido ='"+this.filtroTexto+"'");
  //   var soloTags=this.tags.map((item)=>{return item.slug});
  //   if (this.filtroTexto && this.filtroTexto.trim() != '') {
  //     if (this.contadorTags === 0) {
  //       // filtando solo por texto
  //       console.log("se metió en solo por texto");
  //       this.articulosFiltrados = this.articulos
  //         .filter((item) => {
  //           return (item.contenido.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0 || item.titulo.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0);
  //         });
  //     } else {
  //       //filtando por texto y tags
  //       console.log("texto de busqueda: "+this.filtroTexto +" y tags: "+soloTags);
  //       this.articulosFiltrados = this.articulos
  //         .filter((item) => {
  //           return ((item.contenido.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0 || item.titulo.toLowerCase().indexOf(this.filtroTexto.toLowerCase()) >= 0) &&
  //           _.intersection(item.filtros,soloTags).length === soloTags.length);
  //         });
  //     }
  //     this.filtrado = true;
  //   }
  //   else {
  //     if (this.contadorTags === 0) {
  //       this.filtrado = false;
  //       this.articulosFiltrados=this.articulos;
  //       // ningun filtro
  //       console.log("se metió por ningun filtro");
  //       console.log("Contenido de acciones"+this.articulos);
  //     } else {
  //       // filtrando por solo filtros
  //       console.log("se metió solo filtros");
  //       this.articulosFiltrados = this.articulos
  //         .filter((item) => {
  //           return _.intersection(item.filtros,soloTags).length === soloTags.length;
  //         });
  //       this.filtrado = true;
  //     }
  //   }
  // }

  // borradoFiltroTexto(ev) {
  //   if (this.contadorTags===0){
  //     this.filtrado = false;
  //     console.log('Filtro borrado');
  //   }
  // }

  // borrarFiltro(el: Element, slug) {
  //   console.log("tags antes de remover =" + this.tags);
  //
  //   el.remove();
  //   this.tags=this.tags.filter((x) => {
  //     return x.slug === slug ? false : true
  //   });
  //   this.contadorTags--;
  //   this.filtrarArticulos(event);
  //   console.log("tags despues de remover =" + this.tags);
  // }

  // limpiarFiltros(ev) {
  //   this.filtroTexto="";
  //   this.tags=[];
  //   this.contadorTags=0;
  //   this.filtrado=false;
  // }

  // presentarFiltros(ev) {
    // let filtrosModal = this.modalCtrl.create(FiltrosPage,
    //   {tags: this.tags, contador: this.contadorTags});
    // filtrosModal.onDidDismiss((data) => {
    //     if (data) {
    //       this.tags = data.d;
    //       this.contadorTags = data.cont;
    //       this.filtrarAcciones(ev);
    //       console.log("despues de llamar a filtrar acciones = " + this.contadorTags);
    //     }
    //   }
    // );
    // filtrosModal.present();
  // }
  // getByTipo(tipo) {
  //   console.log("Tipo: "+tipo);
  //   // return this.articulos.filter((item) => {
  //   //   return item.tipo.toUpperCase().indexOf(tipo.toUpperCase()) >= 0
  //   // });
  //   return this.articulos.filter((item) =>
  //     {return item.tipo.toUpperCase().indexOf(tipo.toUpperCase()) >= 0;});
  // }

}
