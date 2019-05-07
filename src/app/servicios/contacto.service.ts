import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contacto } from '../clases/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  enviarMensaje(data) {
    return this.http.post<contacto>('/admin/enviarMensaje', data);
  }
}
