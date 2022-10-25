import { Component, OnInit } from '@angular/core';

//Declaramos la variable de google, para que al instancia elementos de google, los entienda:
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  //VARIABLES PARA EL MAPA:
  latitud: number;
  longitud: number;
  map: any;

  constructor() { }

  ngOnInit() {
    this.cargarMapa();
  }

  //MÉTODOS PARA EL MAPA:
  cargarMapa(){
    const mapa: HTMLElement = document.getElementById('map');

    this.map = new google.maps.Map(mapa, {
      center: {
        lat: -33.60962668977899,
        lng: -70.5750965398923
      },
      zoom: 18
    });
  }

  obtenerUbiucacion(){
    
  }
  
}
