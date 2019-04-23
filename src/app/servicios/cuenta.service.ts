import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cuenta } from '../clases/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) {  }

  getDetallesUsuario(): Observable<any[]> {
    return this.http.get<any[]>('/admin/json_getDetallesUsuario');
  }

  actualizarCuenta(data) {
    return this.http.post<cuenta>('/admin/actualizarCuenta', data);
  }


  getHistorialPedidos() {
    return this.http.get<any[]>('/admin/json_getHistorialPedidos');
  }

  
  cerrarSesion() {
    return this.http.get('/admin/cerrarsesion');
  }
}

