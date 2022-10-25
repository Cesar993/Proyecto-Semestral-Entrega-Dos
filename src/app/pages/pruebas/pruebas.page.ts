import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {
   rut: string;
  usuario: any = {};
  KEY_PERSONAS = 'personas';   
  

  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private storage: StorageService) { }

  async ngOnInit() {
   
     this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDatoPersona(this.KEY_PERSONAS, this.rut);
    console.table(this.usuario); 
  }

}
