import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  menuTipos = [];
  menuMarcas = [];
  menuCheckbox = [];
  articulos = [];
  articulosFiltrados = [];
  paginaActual: number;

  constructor(private tiendaService: TiendaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getArticulos();
  }

  getArticulos(): any {
    this.tiendaService.getArticulos().subscribe(response => {
      this.articulos = response;
      this.articulosFiltrados = response;
    });



    this.tiendaService.getMenuItems('tipos').subscribe(response => {this.menuTipos = response; });
    this.tiendaService.getMenuItems('marcas').subscribe(response => {this.menuMarcas = response; });
  }




  ordenar(event: any) {
    const orden = event.target.value;

    if (orden === 'desc') {this.articulos.sort((a, b) => b.precio - a.precio); }
    if (orden === 'asc') {this.articulos.sort((a, b) => a.precio - b.precio); }
  }

  filtrarPorTitulo(event: any): any {
    this.articulos = this.articulosFiltrados.filter(response =>
      response.nombre.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
  }


  filtroCheckbox(item) {
    this.articulos = this.menuCheckbox;

    for (let i = 0; i < this.articulosFiltrados.length; i++) {
      if (this.articulosFiltrados[i].tipo.indexOf(item) !== -1 || this.articulosFiltrados[i].marca.indexOf(item) !== -1) {
        if (this.menuCheckbox.indexOf(this.articulosFiltrados[i]) === -1) {
          this.menuCheckbox.push(this.articulosFiltrados[i]);
        } else {
          this.menuCheckbox.splice(this.menuCheckbox.indexOf(this.articulosFiltrados[i]), 1);
        }
      }
    }

    if (this.menuCheckbox.length === 0) {
      this.articulos = this.articulosFiltrados;
    }
  }
}
