import {Component} from '@angular/core';
import {NavController, NavParams,ViewController} from 'ionic-angular';
import {Http} from '@angular/http';

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
  prestagna:string;
  filtrosSeleccionados:any;
  contadorFiltros:any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController) {
    this.contadorFiltros=navParams.get("contador");
    if(this.contadorFiltros>0)
      this.filtrosSeleccionados=navParams.get("tags");
    else
      this.filtrosSeleccionados=[];
    // this.contadorFiltros=this.filtrosSeleccionados.length;
    console.log("filtros pasados al modal: "+this.filtrosSeleccionados);
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
        // () => console.log('Lectura de los filtros completadas ' + this.filtrosPoblaciones.toString()) // complete
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
        // () => console.log('Lectura de los filtros completadas ' + this.filtrosInstituciones) // complete
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
        // () => console.log('Lectura de los filtros completadas ' + this.filtrosDerechos) // complete
      );

    this.prestagna="instituciones";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrosPage');
  }
  limpiar(): void {
    // this.viewCtrl.dismiss();
  }
  cerrar(): void {
    this.viewCtrl.dismiss({d:this.filtrosSeleccionados,cont:this.contadorFiltros});
  }
  isSeleccionado(slug){
    if (this.contadorFiltros === 0)
      return false;
    else
      return (this.filtrosSeleccionados.findIndex((item)=>{return item.slug === slug})) >= 0 ? true : false;
  }
  cambioToggle(item){
    if (this.contadorFiltros > 0) {
      let index = this.filtrosSeleccionados.findIndex((x) => {
        return x.slug === item.slug
      });
      if (index >= 0) {
        this.filtrosSeleccionados.splice(index, 1);
        this.contadorFiltros--;
        // console.log("item del toggle removido ahora filtros Seleccionados= "+this.contadorFiltros);
      }
      else {
        this.filtrosSeleccionados.push(item);
        this.contadorFiltros++;
        // console.log("item del toggle agregado a los filtros Seleccionados = "+this.contadorFiltros);

      }
    }else{
      this.filtrosSeleccionados.push(item);
      this.contadorFiltros++;
    }

  }
}
