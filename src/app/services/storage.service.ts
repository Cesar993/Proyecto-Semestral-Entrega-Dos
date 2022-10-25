import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ValidacionesService } from './validaciones.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variables 
  datos: any[] = [];
  dato: any;
  



  /* asistencia: any = [
    {
      id_asistencia: '',
      id_clase: this.clase.id_clase,
      fecha: new Date(),
      alumno: []
    }
  ] */
 //Variable de login
 isAuthenticated = new BehaviorSubject(false);
  constructor(private storage: Storage, private validaciones: ValidacionesService) {
    storage.create();

    

    }
  
  
  //métodos del crud del storage:

  //metodos de persona
  async agregarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoPersona(key, dato.rut);
    if (this.dato == undefined) {

      this.datos.push(dato)
      await this.storage.set(key, this.datos)
      return true;
    }
    return false;
  }

  async getDatoPersona(key, identificador) {
    this.dato = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.rut == identificador);
    return this.dato;
  }

  async eliminarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.rut == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }

  async getDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }
  
  async actualizarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  //metodos de clase

  async agregarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoClase(key, dato.id_clase);
    if (this.dato == undefined) {

      this.datos.push(dato)
      await this.storage.set(key, this.datos)
      return true;
    }
    return false;
  }

  async getDatoClase(key, identificador) {
    this.dato = await this.storage.get(key) || [];
    this.dato = this.datos.find(clase => clase.id_clase == identificador);
    return this.dato;
  }

  async eliminarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.id_clase == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }
  async actualizarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  //metodos de asistencia
  async agregarAsistencia(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoAsistencia(key, dato);
    if (this.dato == undefined) {

      this.datos.push(dato)
      await this.storage.set(key, this.datos)
      return true;
    }
    return false;
  }

  async getDatoAsistencia(key, identificador) {
    this.dato = await this.storage.get(key) || [];
    this.dato = this.datos.find(clase => clase.id_clase == identificador);
    return this.dato;
  }

 /*  async eliminarAsistencia(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.id_clase == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  } */
  async actualizarAsistencia(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(p => p.id_clase == dato);
    this.datos[index] = dato;
 /* this.asistencias[index]=this.asistencias[index].alumnos.push(rut); */
    await this.storage.set(key, this.datos);
  }

  //profesor
  async getClases(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }


  
//METODO PARA VALIDAR LOGIN


async loginUsuario(key, correo, clave) {
  this.datos = await this.storage.get(key) || [];
  var usuarioLogin: any;
  usuarioLogin = this.datos.find(usu => usu.correo == correo && usu.clave == clave);
  if (usuarioLogin != undefined) {
    this.isAuthenticated.next(true);
    return usuarioLogin;
  }

  
}
getAuth(){
  return this.isAuthenticated.value;
}
validarCorreo(correo){
  return this.datos.find(usu => usu.correo == correo);
}

}
