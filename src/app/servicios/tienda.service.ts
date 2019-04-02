import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TiendaService {
  constructor(private http: HttpClient) { }

  getArticulos(): Observable<any[]> {
    return this.http.get<any[]>('/php/datos.php?articulos');
  }

  getDetalleArticulo(k): Observable<any[]> {
    return this.http.get<any[]>('/php/datos.php?detalleArticulo=' + k);
  }

  getMenuItems(apartado: string) {
    switch (apartado) {
      case 'tipos': return this.http.get<any[]>('/php/datos.php?menuTipos');
      case 'marcas': return this.http.get<any[]>('/php/datos.php?menuMarcas');
    }
  }
}
