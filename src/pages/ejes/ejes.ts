import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {EjePage} from '../eje/eje'; //lazy load
import { IonicPage } from 'ionic-angular';
@IonicPage()


@Component({
  selector: 'page-ejes',
  templateUrl: 'ejes.html'
})
export class EjesPage {
  constructor(public navCtrl: NavController) {
  }

  itemSeleccionado(ejeN) {
    console.log("eje # "+ ejeN);
    this.navCtrl.push('EjePage', {
        eje: ejeN
      }
    );
  }
}

