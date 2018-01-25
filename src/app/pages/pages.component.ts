import { Component, OnInit } from '@angular/core';

// con esta funcion declarada se esta llamando a una funcion javascritp externa a angular que se creo en un javascript custom.js
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
