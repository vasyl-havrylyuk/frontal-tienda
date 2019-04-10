import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/servicios/compra.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito = [];
  totalCarrito = 0;

  constructor(private autenticacionService: AutenticacionService, private compraService: CompraService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Carrito');
    this.carrito = this.getCarrito();
    this.getTotalCarrito();
  }

  getCarrito() {
    return JSON.parse(localStorage.getItem('carrito'));
  }

  setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  getTotalCarrito() {
    this.carrito = this.getCarrito();

    for (let i = 0; i < this.carrito.length; i++) {
      this.totalCarrito += parseFloat(this.carrito[i].totalArticulo);
    }
  }

  eliminarDelCarrito(articulo) {
    const tmp = this.getCarrito();

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].k === articulo.k) {
        tmp.splice(tmp.indexOf(tmp[i]), 1);
        this.setCarrito(tmp);
        break;
      }
    }

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/tienda/carrito');
    });
  }

  vaciarCarrito() {
    this.carrito = [];
    this.setCarrito(this.carrito);
  }

  carritoValido() {
    this.carrito = this.getCarrito();

    if (this.carrito.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  finalizarCompra() {
    this.carrito = this.getCarrito();

    this.autenticacionService.estaAutenticado().subscribe(response => {
      if (response.autenticado) {
        if (this.carritoValido()) {
          this.compraService.procesarCompra(this.carrito).subscribe(response2 => {
            if (response2.correcto) {
              this.carrito = [];
              this.setCarrito(this.carrito);
              alert('Compra procesada correctamente');
              this.router.navigate(['/cuenta']);
            }
          });
        }
      } else {
        this.router.navigate(['/login/carrito']);
      }
    });
  }
}
