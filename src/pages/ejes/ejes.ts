import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EjePage} from '../eje/eje';


@Component({
  selector: 'page-ejes',
  templateUrl: 'ejes.html'
})
export class EjesPage {
  constructor(public navCtrl: NavController) {
  }

  itemSeleccionado(event, ejeN) {
    console.log(ejeN);
    this.navCtrl.push(EjePage, {
        eje: ejeN
      }
    );
  }
}

