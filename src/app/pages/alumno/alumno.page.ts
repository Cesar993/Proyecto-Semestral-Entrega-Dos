import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
//LLAVE:
KEY_CLASES = 'clases';  
KEY_ASISTENCIA = 'asistencia';  
KEY_PERSONAS = 'personas'; 
rut: string; 
 usuario: any = {};
clases: any[] = [];
asistencia: any[] = [];
valor: string = null
  constructor(private storage: StorageService, private activatedRoute: ActivatedRoute) { }

 async ngOnInit() {
    await this.cargarClases();
    console.log(this.cargarAsistencia());
    //  RUT
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDatoPersona(this.KEY_PERSONAS, this.rut);
    console.log(this.rut);
  }




  //CARGAR TODAS LAS CLASES QUE VIENEN DESDE EL STORAGE:
  async cargarClases(){
    this.clases = await this.storage.getDatos(this.KEY_CLASES);
  }



    
 
  async registrarAsistencia(){

    var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asistencia);
    if (respuesta) {

    await this.cargarAsistencia();
    console.log(respuesta);
    }
  }   
  async cargarAsistencia(){
    this.asistencia = await this.storage.getDatos(this.KEY_ASISTENCIA);
    console.log(this.asistencia);

  }  

//metodo customer

async tomarClase(){
  var respuesta = this.asistencia.filter(p=> p.cod_clase== this.valor);
  this.actualizar();
  
};
async actualizar(){
await this.storage.actualizarAsistencia(this.KEY_ASISTENCIA, this.rut)
await this.cargarAsistencia(); 
  console.log(this.valor);
  
};


// camara
  @ViewChild(IonModal) modal: IonModal;

  message = '';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      /* this.message = `Hello, ${ev.detail.data}!`; */
    }
  }
}
