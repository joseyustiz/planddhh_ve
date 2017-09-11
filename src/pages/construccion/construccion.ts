import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http'; //Service to handle requests. HTTP calls returns observable of HTTP Responses (Observable<Response>)
import {SocialSharing} from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicPage } from 'ionic-angular';
@IonicPage()


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
  articulosEtapa1: any;
  articulosEtapa2: any;
  articulosEtapa3: any;
  tags: any; //almacena los tags seleccionado como filtros
  contadorTags: any;
  filtroTexto:string;
  prestagna:string;
  tipos:any= [];


  constructor(private http: Http, private socialSharing: SocialSharing,
              public navCtrl: NavController, public navParams: NavParams,platform: Platform,  ga: GoogleAnalytics) {
    this.cargarArticulos();
    this.contadorTags = 0;
    this.tags = [];
    this.filtroTexto="";
    this.tipos=[{tag:"ANTECEDENTES",titulo:"Antecedentes"}, {tag:"CONSTRUCCION",titulo:"Construcción"}, {tag:"RESULTADOS",titulo:"Resultados"}];
    this.prestagna=this.tipos[0].tag;
    //Google Analytics
    platform.ready().then(() => { ga.trackView("Listado de Art. Construccion del Plan"); });
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
        {return item.tipo.toUpperCase().indexOf("ETAPA1") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosEtapa1= data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosEtapa1.toString()) // complete
      );
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion.filter((item) =>
        {return item.tipo.toUpperCase().indexOf("ETAPA2") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosEtapa2= data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosEtapa2.toString()) // complete
      );
    this.http.get('assets/data/construccion.json')
      .map(res => {
        return res.json().construccion.filter((item) =>
        {return item.tipo.toUpperCase().indexOf("ETAPA3") >= 0;})
      })
      .subscribe(
        data => {
          this.articulosEtapa3= data;
        },
        err => console.log("error es " + err), // error
        () => console.log('Lectura de los artículos de construcción completadas ' + this.articulosEtapa3.toString()) // complete
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
    this.navCtrl.push('ConstruccionDetallePage', {
        articulo: articulo
      }
    );
    console.log(articulo);

  }
}
