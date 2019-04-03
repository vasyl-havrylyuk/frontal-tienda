import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../clases/registro.class';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor(private http: HttpClient, private router: Router) {  }

  registrarUsuario(formulario) {
    return this.http.post<Registro>('/admin/registro', {formulario});
  }
}
