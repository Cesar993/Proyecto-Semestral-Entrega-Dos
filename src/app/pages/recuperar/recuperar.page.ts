import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  //variable del correo:
  correo: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router,private alertController: AlertController, private storage: StorageService) { }

  ngOnInit() {
  }

  //método para recuperar
  recuperar(){
    if (this.storage.validarCorreo(this.correo) != undefined) {
      this.presentAlertConf();
      this.correo = '';
      this.router.navigate(['/login']);
    }else{
      this.presentAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'El correo no es valido',
      
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlertConf() {
    const alert = await this.alertController.create({
      
      subHeader: 'Se ha enviado la nueva contraseña a tu correo!',
      
      buttons: ['OK'],
    });

    await alert.present();
  }
}
