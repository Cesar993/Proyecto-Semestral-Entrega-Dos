import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(private router: Router,private alertController: AlertController, private storage: StorageService) { }

  async ngOnInit() {
    var admin = {
      rut: '11.222.333-4',
      nombre: 'Patricio',
      ap_paterno: 'Salinas',
      fecha_nac: '1990-12-24',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    };
    await this.storage.agregarPersona("personas", admin);
  }

  //crear nuestro métodos:
  async ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.correo.value;
    var claveValidar = this.usuario.controls.clave.value;

    //rescatamos el usuario con el método login usuario:
     var usuarioLogin = await this.storage.loginUsuario('personas',correoValidar, claveValidar);
     //validamos si existe el usuario
     if (usuarioLogin != undefined) {
      console.log(usuarioLogin)
    //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };

      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home'], navigationExtras);

    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'El correo o la contraseña son invalidos',
      
      buttons: ['OK'],
    });

    await alert.present();
  }


}
