import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //DEBEMOS PODER RECIBIR EL VALOR QUE VIENE DESDE LA PAGINA HOME:
  rut: string;
  usuario: any = {};
  KEY_PERSONAS = 'personas';  
  constructor(private activatedRoute: ActivatedRoute, private storage: StorageService) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDatoPersona(this.KEY_PERSONAS, this.rut);
    console.table(this.usuario);
  }

}
