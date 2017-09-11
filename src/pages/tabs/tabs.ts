import { Component } from '@angular/core';
import { HomePage } from '../home/home';

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
