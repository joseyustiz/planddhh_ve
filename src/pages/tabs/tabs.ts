import { Component } from '@angular/core';

// import { EjesPage } from '../ejes/ejes'; //lazy load
// import { AccionesPage } from '../acciones/acciones'; //lazy load
import { HomePage } from '../home/home';
// import { ConstruccionPage } from '../construccion/construccion'; //lazy load
//import { InvitarPage } from '../invitar/invitar';
// import { InformacionPage } from '../informacion/informacion';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'EjesPage';
  tab3Root = 'AccionesPage';
  tab4Root = 'ConstruccionPage';
  tab5Root = 'InvitarPage';
  tab6Root = 'InformacionPage';



  constructor() {

  }
}
