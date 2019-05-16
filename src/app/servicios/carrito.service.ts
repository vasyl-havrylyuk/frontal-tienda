import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  numeroArticulos = new EventEmitter<any>();

  constructor() { }

  
}
