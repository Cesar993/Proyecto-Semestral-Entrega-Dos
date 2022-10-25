import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

 
  clases: any[] = [];
  //VAMOS A CREAR LAS VARIABLES PARA NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';
  dateDay = '';
  KEY_CLASES = 'clases';  
  constructor(private storage: StorageService) { }

  async ngOnInit() {
    await this.cargarClases();
    this.clases = await this.storage.getDatos('clases');
    console.log(this.clases);
    
  }

  //método para generar un código unico para el codigo QR:
  generarCodigo(value){
  
      this.value =  value;
    
  }
  obtenerDia(){
    const today = new Date();
    const date = today.toDateString();
    return date;
}
    //CARGAR TODAS LAS Clases QUE VIENEN DESDE EL STORAGE:
    async cargarClases(){
      this.clases = await this.storage.getClases(this.KEY_CLASES);
    }

    async buscar(dato){
      this.clases = await this.storage.getDatoClase(this.KEY_CLASES, dato);
    }
}
