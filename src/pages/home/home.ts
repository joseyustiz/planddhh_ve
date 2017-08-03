import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EjesPage} from '../ejes/ejes';
import { AccionesPage } from '../acciones/acciones';
import { ConstruccionPage } from '../construccion/construccion';
import {InvitarPage} from "../invitar/invitar";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  itemSeleccionado(opcion) {
    switch(opcion) {
      case "ejes": {
        console.log(opcion);
        this.navCtrl.push(EjesPage);
        break;
      }
      case "acciones":{
        console.log(opcion);
        this.navCtrl.push(AccionesPage);
        break;
      }
      case "construccion":{
        console.log(opcion);
        this.navCtrl.push(ConstruccionPage);
        break;
      }
      case "invitar":{
        console.log(opcion);
        this.navCtrl.push(InvitarPage);
        break;
      }
      default:{
        console.log("opción seleccionada en la pagina home es incorrecta");
        break;
      }
    }
  }
}
