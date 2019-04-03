import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from 'src/app/clases/compra.class';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompraService {

  constructor(private http: HttpClient) { }

  getCarrito(): Observable<any[]> {
    return JSON.parse(localStorage.getItem('carrito'));
  }

  procesarCompra(carrito) {
    return this.http.post<Compra>('/admin/compra', {carrito});
  }

}
