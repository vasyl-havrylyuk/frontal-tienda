import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) {  }

  getDetallesUsuario(): Observable<any[]> {
    return this.http.get<any[]>('/admin/json_getDetallesUsuario');
  }

  cerrarSesion() {
    return this.http.get('/admin/cerrarsesion');
  }
}

