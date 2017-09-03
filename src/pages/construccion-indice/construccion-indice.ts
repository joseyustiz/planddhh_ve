import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ArticulosConstruccionProvider} from "../../providers/articulos-construccion/articulos-construccion";

/**
 * Generated class for the ConstruccionIndicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-construccion-indice',
  templateUrl: 'construccion-indice.html',
})
export class ConstruccionIndicePage {
  prestagna:string;
  articulos:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public construccionService: ArticulosConstruccionProvider) {
    this.prestagna="ANTECEDENTES";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstruccionIndicePage');
    this.construccionService.cargar().then(data => {
      this.articulos = data;
    });
  }

}
