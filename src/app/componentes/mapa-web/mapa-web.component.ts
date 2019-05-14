import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { TiendaService } from 'src/app/servicios/tienda.service';

@Component({
  selector: 'app-mapa-web',
  templateUrl: './mapa-web.component.html',
  styleUrls: ['./mapa-web.component.scss']
})
export class MapaWebComponent implements OnInit {
  articulos = [];

  constructor(private tiendaService: TiendaService, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.parametrizarCaminoMigas();
    this.getArticulos();
  }


  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Mapa web', url: '/mapaweb', params: []},
      {label: '', url: '', params: []},
    ])
  }


  getArticulos(): any {
    this.tiendaService.getArticulos().subscribe(res => {
      this.articulos = res;
      console.log(res);
    });
  }
}
