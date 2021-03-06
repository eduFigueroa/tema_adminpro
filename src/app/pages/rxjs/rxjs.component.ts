import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable, Subscription } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


     this.subscription = this.regresaObservable()

    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('error en el obs', error),
      () => console.log('El observador termino!')

    );
   }

  ngOnInit() {

      }

 ngOnDestroy() {
 // para lla mara la desuscripcion de una subscripciond eun observable... estoes para parar un observable al cambiar pagina
   this.subscription.unsubscribe();

      }


  regresaObservable(): Observable<any> {
       return new Observable( observer => {

      let contador = 0;
      let intervalo  = setInterval( ( ) => {
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if (contador === 2) {

        //   observer.error('Auxilio');
        // }

      }, 500);

    })
    .retry(2)

      // el operador map siempre va a funcionar cuando nos hayamos subscrito en algo anteriormente... y el map transforma cosas
      .map( (resp: any) => {

        return resp.valor;
      })

      //  realiza el filtro de informacion que se va a mostrar, en este ejemplo se estan filtrando los pares.
      .filter( (valor, index) => {
        if ( valor % 2 === 1) {
            // impar
            return true;
        } else {
          // par
          return false;
        }

      } );

  }
}
