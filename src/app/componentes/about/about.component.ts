import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.parametrizarCaminoMigas();
  }


  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Acerca de', url: '/about', params: []},
      {label: '', url: '', params: []},
    ])
  }
}
