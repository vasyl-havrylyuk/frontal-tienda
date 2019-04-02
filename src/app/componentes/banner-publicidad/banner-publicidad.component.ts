import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-publicidad',
  templateUrl: './banner-publicidad.component.html',
  styleUrls: ['./banner-publicidad.component.scss']
})
export class BannerPublicidadComponent implements OnInit {
  banner = 'banner.png';

  constructor() { }

  ngOnInit() {
  }

}
