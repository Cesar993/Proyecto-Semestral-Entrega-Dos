import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ValidacionesService } from '../../services/validaciones.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
 //variable grupo:
 nuevaClase = new FormGroup({
  id_clase: new FormControl('', [Validators.required]),
  nombre: new FormControl('', [Validators.required, Validators.minLength(3),]),
  sigla: new FormControl('', [Validators.required, Validators.minLength(3)]),
  profesor: new FormControl('', [Validators.required])
});
search = '';

clases: any[] = [];
profesores: any []= [];

//LLAVE:
KEY_CLASES = 'clases';  
constructor(private storage: StorageService, private loadingCtrl: LoadingController, private alertController: AlertController, private validacion: ValidacionesService) { }

  async ngOnInit() {
    await this.cargarClases();
    this.profesores = await this.storage.getDatos('personas');
    this.profesores = this.profesores.filter(p=> p.tipo_usuario == 'profesor');
  }
    //CARGAR TODAS LAS CLASES QUE VIENEN DESDE EL STORAGE:
    async cargarClases(){
      this.clases = await this.storage.getDatos(this.KEY_CLASES);
    }


    async registrarClase(){
      
      var respuesta: boolean = await this.storage.agregarClase(this.KEY_CLASES, this.nuevaClase.value);
      if (respuesta == true) {
        this.presentAlert();
        this.nuevaClase.reset();
        
      }
      else {
        alert('la clase ya existe!');
      }
      await this.cargarClases();
    }

    async eliminarClase(id){
      await this.storage.eliminarClase(this.KEY_CLASES, id);
      /* await this.cargando('eliminando...'); */
      await this.cargarClases();
    }

    async buscar(id_clase){
      let buscarClase = await this.storage.getDatoClase(this.KEY_CLASES, id_clase);
      this.nuevaClase.setValue(buscarClase);
    }

    async modificar(){

      await this.storage.actualizarClase(this.KEY_CLASES, this.nuevaClase);
      /* await this.cargando('actualizando clase...'); */
      
      await this.cargarClases(); 
      
    }

      // LIMPIAR
  limpiar(){
    this.nuevaClase.reset();
  };

  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      subHeader: 'Clase registrada correctamente',
      
      buttons: ['OK'],
    });

    await alert.present();
  }
}
