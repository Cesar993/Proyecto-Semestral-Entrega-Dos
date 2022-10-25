import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
   //variable grupo:
   usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    fecha_nac: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
    search = '';

  personas: any[] = [];
  repetir_clave: string;

   //LLAVE:
   KEY_PERSONAS = 'personas';  

  constructor(private storage: StorageService, private loadingCtrl: LoadingController, private alertController: AlertController, private validacion: ValidacionesService) { }

 async  ngOnInit() {
    await this.cargarPersonas();
  }

    //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
    async cargarPersonas(){
      this.personas = await this.storage.getDatos(this.KEY_PERSONAS);
    }
  
    async registrar(){
      if (!this.validar()) {
        /* alert('Rut Incorrecto'); */
        return;
      }
      var respuesta: boolean = await this.storage.agregarPersona(this.KEY_PERSONAS, this.usuario.value);
      if (respuesta == true) {
        this.presentAlert();
        this.usuario.reset();
        this.repetir_clave = '';
      }
      else {
        alert('Usuario ya existe!');
      }
      await this.cargarPersonas();
    }

    async eliminar(rut){
      await this.storage.eliminarPersona(this.KEY_PERSONAS, rut);
      await this.cargando('eliminando...');
      await this.cargarPersonas();
    }
  
    async buscar(rut){
      let buscarPersona = await this.storage.getDatoPersona(this.KEY_PERSONAS, rut);
      this.usuario.setValue(buscarPersona);
    }
   

  
    async modificar(){

      await this.storage.actualizarPersona(this.KEY_PERSONAS, this.usuario);
      await this.cargando('actualizando personas...');
      
      await this.cargarPersonas(); 
      
    }
  
   
  
    //METODO DE LOADING:
    async cargando(mensaje){
      const loading = await this.loadingCtrl.create({
        message: mensaje,
        duration: 1000
      });
      loading.present();
    }
  // LIMPIAR
  limpiar(){
    this.usuario.reset();
  };


  
///////////////////////////////////////////////////////////////////////////////////////
  validar() {
    if (!this.validacion.validarRut(this.usuario.controls.rut.value)) {
      this.presentAlertRut();
      return false;
    }
    
     if (!this.validacion.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      this.presentAlertAge();
      return false;
    }
    if (this.usuario.controls.clave.value != this.repetir_clave) {
      this.presentAlertPass();
      return false;
    } 
      return true;
    }

///////////////////////////////////////////////////////////////////////////////////////   
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      subHeader: 'Usuario registrado correctamente',
      
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertOops() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'El usuario ya existe',
      
      buttons: ['OK'],
    });

    await alert.present();
  }

   async presentAlertPass() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'Contraseñas no coinciden!',
      
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertAge() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'La edad minima debe ser 17 años!',
      
      buttons: ['OK'],
    });

    await alert.present();
  } 

  async presentAlertRut() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'Rut incorrecto!',
      
      buttons: ['OK'],
    });

    await alert.present();
  }

/*   async presentAlertModifi() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      subHeader: 'Usuario modificado',
      
      buttons: ['OK'],
    });

    await alert.present(); 
  
  }*/

  noEspaciosAlPrincipio() {
    
    let stringArr = this.search.split(/(\s+)/);
    if (stringArr[0] === '') {
    this.search = '';

    for (let i = 2; i < stringArr.length; i++) {
     this.search += stringArr[i];
    }
  }
 }


}
