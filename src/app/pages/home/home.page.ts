import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  //variables de usuario que recibirá los datos que vienen desde login:
  usuario: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

  //método para logout:
  logout() {
    this.usuarioService.logout();
  }


  async presentAlertCerrar() {
    const alert = await this.alertController.create({
      header: 'Seguro que deseas cerrar la ventana?!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
