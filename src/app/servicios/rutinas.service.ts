import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  constructor(private http: HttpClient) { }

  getRutinas(): Observable<any[]> {
    return this.http.get<any[]>('/php/datos.php?rutinas');
  }

  getMenuNiveles(): Observable<any[]> {
    return this.http.get<any[]>('/php/datos.php?menuNiveles');
  }
}
