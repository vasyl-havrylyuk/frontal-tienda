import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  filtros = {'tipo': null, 'marca': null};
  menuTipos = [];
  menuMarcas = [];
  menuCheckbox = [];
  articulos = [];
  articulosFiltrados = [];
  paginacion = 5;
  paginaActual: number;



  constructor(private tiendaService: TiendaService, breakpointObserver: BreakpointObserver, private route: ActivatedRoute) { 
    breakpointObserver.observe(['(max-width: 768px)']).subscribe(response => {
      if (response.matches) {
        this.modificarMenuLateral('minimize');
      } else {
        this.modificarMenuLateral('maximize');
      }
    });
  }



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



  filtrar(apartado, item) {
    if (apartado === 'tipo') { this.filtros.tipo = item; }
    if (apartado === 'marca') { this.filtros.marca = item; }
    
    $('.eliminarFiltros').css({'display': 'inline'});

    if (this.filtros.tipo !== null && this.filtros.marca !== null) {
      this.articulos = this.articulosFiltrados.filter(response => response.tipo.indexOf(this.filtros.tipo) !== -1 && response.marca.indexOf(this.filtros.marca) !== -1);
    } else if (apartado === 'tipo') {
      this.articulos = this.articulosFiltrados.filter(response => response.tipo.indexOf(item) !== -1);
    } else if (apartado === 'marca') {
      this.articulos = this.articulosFiltrados.filter(response => response.marca.indexOf(item) !== -1);
    }
  }

  eliminarFiltros(apartado) {
    $('.eliminarFiltros').css({'display': 'none'});
    $('#card-articulos input[type=radio]:checked, #card-marcas input[type=radio]:checked').prop('checked', false);

    this.filtros.tipo = null;
    this.filtros.marca = null;
    this.articulos = this.articulosFiltrados;
  }



  modificarMenuLateral(parametro) {
    switch (parametro) {
      case 'minimize': $('#card-articulos, #card-marcas').removeClass('show'); break;
      case 'maximize': $('#card-articulos, #card-marcas').addClass('show'); break;
    }
  }
}
