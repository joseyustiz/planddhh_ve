import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prestagna="antecedentes";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstruccionIndicePage');
  }

}
