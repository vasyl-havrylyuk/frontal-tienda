import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaService } from '../../servicios/tienda.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.scss']
})
export class DetalleArticuloComponent implements OnInit {
  detalleArticulo = [];
  cantidad = 1;
  carrito = [];

  constructor(private tiendaService: TiendaService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.getDetalleArticulo();
    // Establecemos el titulo de la pagina dentro del observable getDetalleArticulo
  }

  getDetalleArticulo() {
    this.route.params.subscribe(parametro => {
      const k = parametro['k'];

      this.tiendaService.getDetalleArticulo(k).subscribe(response => {
        this.detalleArticulo = response;
        this.titleService.setTitle(this.detalleArticulo[0].nombre);
      });
    });
  }

  actualizarCarrito(articulo) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const totalArticulo = this.cantidad * articulo.precio;
    const cantidad = this.cantidad;

    articulo.cantidad = cantidad;
    articulo.totalArticulo = totalArticulo;

    let existe = 0;

    // En caso de que exista en el carrito el producto seleccionado
    // recorremos el carrito para modificar las cantidades y los totales
    // y con la var existe especificamos que el producto seleccionado existe en el carrito
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].k === articulo.k) {
        carrito[i].cantidad = cantidad;
        carrito[i].totalArticulo = totalArticulo;
        existe = 1;
        break;
      }
    }


    // en caso de que el usuario haya seleccionado un producto que todavia no existe en el carrito
    // lo metemos al carrio, ponemos la var existe a 0 (false)
    if (!existe) {
      carrito.push(articulo);
      existe = 0;
    }


    // seteamos el carrito en el almacenamiento web.
    localStorage.setItem('carrito', JSON.stringify(carrito));

    this.router.navigate(['/tienda/carrito']);
  }
}

