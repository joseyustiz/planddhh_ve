import { Component } from '@angular/core';

import { EjesPage } from '../ejes/ejes';
import { AccionesPage } from '../acciones/acciones';
import { HomePage } from '../home/home';
import { ConstruccionPage } from '../construccion/construccion';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EjesPage;
  tab3Root = AccionesPage;
  tab4Root = ConstruccionPage;


  constructor() {

  }
}
