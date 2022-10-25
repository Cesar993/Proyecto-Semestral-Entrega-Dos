import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  //VARIABLES PARA PROBAR EL STORAGE:
  clases: any[] = [];
  profesores: any[] = [];
  asistencia: any[] = [] ;
  usuario: any = {};
  KEY_PERSONAS = 'personas';  
  rut: string;
   asist: any = {
    cod_asistencia:'',
    cod_clase:'',
    fecha:'',
    alumnos:[]   
  }; 
  

   //LLAVE:
   KEY_CLASES = 'clases';  
   KEY_ASISTENCIA = 'asistencia';  

   elementType = 'canvas';
   value = '';
  constructor(private storage: StorageService, private activatedRoute: ActivatedRoute, private router: Router) { }
  async ngOnInit() {
    //  RUT
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDatoPersona(this.KEY_PERSONAS, this.rut);
    console.log(this.rut);
    




    await this.cargarClases();
    this.clases = await this.storage.getDatos('clases');
    this.clases = this.clases.filter(p=> p.profesor== this.rut); 
    console.log(this.clases);
   

  }
    //CARGAR LAS CLASES QUE VIENEN DESDE EL STORAGE:
    async cargarClases(){
      this.clases = await this.storage.getDatos(this.KEY_CLASES);

    }


   

    async eliminarClase(id){
      await this.storage.eliminarClase(this.KEY_CLASES, id);
      /* await this.cargando('eliminando...'); */
      await this.cargarClases();
    }

   

    // iniciar clase

  
 
   async registrarAsistencia(cod){
    this.asist.cod_asistencia = this.generarCodigo();
      this.asist.cod_clase = cod;
      this.asist.fecha = this.obtenerDia();
      var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asist);
      if (respuesta) {
        /* console.log(this.autoIncrementable()); */
      await this.cargarAsistencia();
      console.log(respuesta);
      }
    }   
    async cargarAsistencia(){
      this.asistencia = await this.storage.getDatos(this.KEY_ASISTENCIA);
      console.log(this.asistencia);
 
    }  
  //método para generar codigo QR:
  generarCodigo(){
    if (this.value == '') {
      
      return  this.value = v4();
    }
  }

  obtenerDia(){
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    
    return date;
}
autoIncrementable(){
  const numero = this.clases.length
  return numero;
  
};
  
}
