import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the ArticulosConstruccionProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class ArticulosConstruccionProvider {
  articulos: any;
  tipos:any= ["ANTECEDENTES", "CONSTRUCCION", "RESULTADOS"];

  constructor(public http: Http) {
    console.log('Hello ArticulosConstruccionProvider Provider');
    // this.cargar();
  }

  cargar() {
    if (this.articulos) {
      // already loaded data
      return Promise.resolve(this.articulos);
    }

    return new Promise(resolve => {
      this.http.get('assets/data/construccion-plan.json')
        .map(res => {
          return res.json().articulos
        })
        .subscribe(
          data => {
            this.articulos = data;
            resolve(this.articulos);
          },
          err => console.log("error es " + err), // error
          () => console.log('Lectura de los artículos de construcción completadas ' + this.articulos.toString()) // complete
        );
    });
  }


  getByTipo(tipo) {
    return this.articulos.filter((item) => {
      return item.tipo.toUpperCase().indexOf(tipo.toUpperCase()) >= 0
    });
  }
}
