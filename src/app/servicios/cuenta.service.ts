import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) {  }


  cerrarSesion() {
    return this.http.post('/php/cuenta.php', {'cerrarSesion': ''} );
  }
}

