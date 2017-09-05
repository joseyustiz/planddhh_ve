import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import { IonicPage } from 'ionic-angular';
@IonicPage()
/**
 * Generated class for the InvitarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-invitar',
  templateUrl: 'invitar.html',
})
export class InvitarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitarPage');
  }
  itemSeleccionado(opcion) {
    switch(opcion) {
      case "pdf": {
        console.log(opcion);
        this.compartirAccion("Descarga PDF del Plan Nacional de DDHH 2016-2019","Invitación a descargar PDF del Plan DDHH",null,"http://consejoderechoshumanos.gob.ve/wp-content/uploads/2015/07/plan_Nacional_Derechos_Humanos.pdf");
        break;
      }
      case "app":{
        console.log(opcion);
        this.compartirAccion("Descarga la Aplicación Móvil del Plan Nacional de DDHH 2016-2019","Invitación a descargar Aplicación Móvil del Plan DDHH",null,"http://consejoderechoshumanos.gob.ve/wp-content/uploads/2015/07/plan_Nacional_Derechos_Humanos.pdf");
        break;
      }
      case "gaceta":{
        console.log(opcion);
        this.compartirAccion("Descarga Gaceta Oficial del Plan Nacional de DDHH 2016-2019","Invitación a descargar la Gaceta Oficial del Plan DDHH",null,"http://consejoderechoshumanos.gob.ve/wp-content/uploads/2015/07/plan_Nacional_Derechos_Humanos.pdf");
        break;
      }
      default:{
        console.log("opción seleccionada en la página invitar es incorrecta");
        break;
      }
    }
  }

  compartirAccion(accion, titulo, archivo, url) {
    this.socialSharing.share(accion, titulo, archivo, url)
      .then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

}
