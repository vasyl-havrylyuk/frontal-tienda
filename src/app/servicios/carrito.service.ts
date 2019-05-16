import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  numeroArticulos: any = new EventEmitter();

  constructor() { }


  actualizarContador() {
    this.numeroArticulos.emit(JSON.parse(localStorage.getItem('carrito')).length);
  }
  
}
