import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variable:
  usuarios: any[] = [
    {
      rut: '11.222.333-4',
      nombre: 'Admin',
      ap_paterno: 'istrador',
      fecha_nac: '1990-12-24',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    },{
      rut: '18.888.333-3',
      nombre: 'Alumno',
      ap_paterno: 'Uno',
      fecha_nac: '1990-06-10',
      correo: 'alumno@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    },
    {
      rut: '18.541.304-7',
      nombre: 'Profesor',
      ap_paterno: 'Uno',
      fecha_nac: '1994-06-12',
      correo: 'profesor@duocuc.cl',
      clave: 'profesor',
      tipo_usuario: 'profesor'
    }
  ];

  //VAMOS A CREAR UNA VARIABLE QUE SE ENCARGUE DE SABER SI ESTOY LOGUEADO O NO:
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }

  //métodos:
  addUsuario(usuario) {
    if (this.getUsuario(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  getUsuario(rut) {
    return this.usuarios.find(usu => usu.rut == rut);
  }

  getUsuarios() {
    return this.usuarios;
  }

  updateUsuario(usuario) {
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  deleteUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }


  //métodos customer:
  loginUsuario(correo, clave) {
    var usuarioLogin: any;
    usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
    if (usuarioLogin != undefined) {
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validarCorreo(correo){
    return this.usuarios.find(usu => usu.correo == correo);
  }
}
