import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { LoginComponent } from '../../login/login.component';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
                public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiaColor(tema: string, link: any) {
    this.aplicarCheck(link);

    this._ajustes.aplicarTema(tema);
    // let url = `assets/css/colors/${ tema }.css`;
    // this._document.getElementById('tema').setAttribute('href', url) ;

    // this._ajustes.ajustes.tema = tema;
    // this._ajustes.ajustes.temaUrl = url;

    // this._ajustes.guardarAjustes();


  }

  aplicarCheck(link: any) {

    // esta linea recorre todo el arreglo de elementos y devuelve los que tengan la clase selector
    let selector: any = document.getElementsByClassName('selector');

    for (let ref of selector) {
      ref.classList.remove('working');

    }

    link.classList.add('working');

  }

  colocarCheck(){
    let selector: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selector) {
      if ( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }

    }
  }

}
