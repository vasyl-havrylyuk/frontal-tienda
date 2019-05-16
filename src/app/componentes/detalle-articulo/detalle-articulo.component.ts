import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaService } from '../../servicios/tienda.service';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsService } from 'ng6-breadcrumbs';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.scss']
})
export class DetalleArticuloComponent implements OnInit {
  detalleArticulo = [];
  cantidad: number;
  carrito = [];

  constructor(private tiendaService: TiendaService, private route: ActivatedRoute, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.getDetalleArticulo();
  }


  parametrizarCaminoMigas(nombreArticulo, idArticulo) {
    this.breadcrumbs.store([
      {label: 'Tienda', url: '/tienda', params: []},
      {label: nombreArticulo, url: 'tienda/articulo/'+idArticulo, params: []},
      {label: '', url: '', params: []},
    ])
  }

  getDetalleArticulo() {
    this.route.params.subscribe(parametro => {
      const k = parametro['k'];

      this.tiendaService.getDetalleArticulo(k).subscribe(response => {
        this.detalleArticulo = response;
        this.titleService.setTitle(this.detalleArticulo[0].nombre);
        this.parametrizarCaminoMigas(this.detalleArticulo[0].nombre, k);
        
      });

      this.cantidad = this.getCantidadActual(k);
    });
  }

  getCantidadActual(k): number {
    var cantidad = 1;

    var carrito = JSON.parse(localStorage.getItem('carrito'));
    var articuloExistente = carrito.filter(response => response.k.indexOf(k) !== -1);
    
    if (articuloExistente.length !== 0) {
      cantidad = articuloExistente[0].cantidad;
    }

    return cantidad;
  }
  

  actualizarCarrito(articulo) {
    // IFS ternarios que comprueban la cantidad, en caso de ser negativa o superar el stock se modifica su valor
    this.cantidad > articulo.stock ? this.cantidad = articulo.stock : null;
    this.cantidad <= 0 ? this.cantidad = 1 : null;

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const totalArticulo = (this.cantidad * articulo.precio).toFixed(2);
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

