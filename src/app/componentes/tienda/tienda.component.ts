import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsService } from 'ng6-breadcrumbs';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  menuTipos = [];
  menuMarcas = [];
  articulos = [];
  articulosCopy = [];
  paginacion = 6;
  paginaActual: number;
  
  filtros = {
    "orden":  null,
    "titulo": null, 
    "tipo":   null, 
    "marca":  null
  };


  constructor(private router: Router, private tiendaService: TiendaService, breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private titleService: Title, private breadcrumbs: BreadcrumbsService) { 
    breakpointObserver.observe(['(max-width: 768px)']).subscribe(response => {
      if (response.matches) {
        this.modificarMenuLateral('minimize');
      } else {
        this.modificarMenuLateral('maximize');
      }
    });
  }



  ngOnInit() {
    this.titleService.setTitle('Tienda');
    this.getArticulos();
    this.parametrizarCaminoMigas();
  }

  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Tienda' , url: '/', params: []},
      {label: '' , url: '', params: []}
    ])
  }

  getArticulos(): any {
    this.tiendaService.getArticulos().subscribe(response => {
      this.articulos = response;
      this.articulosCopy = response;
    });

    this.tiendaService.getMenuItems('tipos').subscribe(response => {this.menuTipos = response; });
    this.tiendaService.getMenuItems('marcas').subscribe(response => {this.menuMarcas = response; });
  }
  


  verDetalle(k) {
    this.router.navigate(['/tienda/articulo/'+k]);
  }


  


  ordenar(event: any) {
    this.filtros.orden = event.target.value;
    this.aplicarFiltros();
  }

  filtrarPorTitulo(event: any): any {
    this.filtros.titulo = event.target.value;
    this.aplicarFiltros();
  }


  removeChecked(event: any, filtro: string) {
    $(event.target).parent().parent().siblings().each(function(){
      $(this).find('input[type=radio]').removeClass('checked');
    });

    if ($(event.target).hasClass("checked")) {
      $(event.target).prop("checked", false);
      $(event.target).removeClass("checked");
      if (filtro === 'tipo') this.filtros.tipo = null;
      if (filtro === 'marca') this.filtros.marca = null;
    } else {
      $(event.target).addClass("checked");
    }
  }

  filtrarTipo(event: any) {
    this.filtros.tipo = event.target.value;
    this.removeChecked(event, 'tipo');
    this.aplicarFiltros();
  }

  filtrarMarca(event: any) {
    this.filtros.marca = event.target.value;
    this.removeChecked(event, 'marca');
    this.aplicarFiltros();
  }



  aplicarFiltros () {
    this.articulos = this.articulosCopy;

    const orden = this.filtros.orden;
    const titulo = this.filtros.titulo;
    const tipo   = this.filtros.tipo;
    const marca  = this.filtros.marca;

    if (titulo) {this.articulos = this.articulos.filter(response => response.nombre.toLowerCase().indexOf(titulo.toLowerCase()) !== -1);}
    if (tipo) {this.articulos = this.articulos.filter(response => response.tipo.indexOf(tipo) !== -1);}
    if (marca) {this.articulos = this.articulos.filter(response => response.marca.indexOf(marca) !== -1);}
    if (orden === 'desc') {this.articulos.sort((a, b) => b.precio - a.precio); }
    if (orden === 'asc') {this.articulos.sort((a, b) => a.precio - b.precio); }
  }


  modificarMenuLateral(parametro) {
    switch (parametro) {
      case 'minimize': $('#card-articulos, #card-marcas').removeClass('show'); break;
      case 'maximize': $('#card-articulos, #card-marcas').addClass('show'); break;
    }
  }
}
