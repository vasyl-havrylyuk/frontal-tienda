import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autenticacion } from '../clases/autenticacion.class';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  constructor(private http: HttpClient, private router: Router) {
  }


  autenticar(usuario, password) {
    return this.http.post<Autenticacion>('/php/autenticacion.php', {usuario, password});
  }


  /*  Verificamos si el usuario está logueado  */
  estaAutenticado() {
    return this.http.get<Autenticacion>('/php/autenticacion.php?comprobarLogin');
  }

}

