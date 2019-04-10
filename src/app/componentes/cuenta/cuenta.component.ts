import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  autenticado: boolean;
  usuario = [];

  constructor(private autenticacionService: AutenticacionService, private cuentaService: CuentaService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Detalles de la cuenta');
    this.estaAutenticado();
    this.getDetallesUsuario();
  }


  estaAutenticado() {
    this.autenticacionService.estaAutenticado().subscribe(response => {
      if (!response.autenticado) {
        this.autenticado = false;
        this.router.navigate(['/login/cuenta']);
      } else {
        this.autenticado = true;
      }
    });
  }

  getDetallesUsuario() {
    this.cuentaService.getDetallesUsuario().subscribe(response => {
      this.usuario = response;
    });
  }

  cerrarSesion() {
    this.cuentaService.cerrarSesion().subscribe(response => {
      this.router.navigate(['/login/cuenta']);
    });
  }
}
