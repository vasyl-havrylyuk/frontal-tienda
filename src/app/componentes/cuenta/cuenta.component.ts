import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  actualizarCuenta(event: any) {
    let $usuario = $('#usuario');
    let $nombre = $('#nombre');
    let $apellido = $('#apellido');
    let $dni = $('#dni');
    let $direccion = $('#direccion');
    let $email = $('#email');
    

    
    if ($usuario.val() == "") {
        $usuario.addClass('is-invalid');
        event.preventDefault();
    }

    if ($nombre.val() == "") {
        $nombre.addClass('is-invalid');
        event.preventDefault();
    }

    if ($apellido.val() == "") {
        $apellido.addClass('is-invalid');
        event.preventDefault();
    }
    
    // ERROR ARREGLAR
    if ($dni.val() == "" || !/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test($dni.val()) && !/^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test($dni.val())) {
        $dni.addClass('is-invalid');
        event.preventDefault();
    }

    if ($direccion.val() == "") {
        $direccion.addClass('is-invalid');
        event.preventDefault();
    }

    if ($email.val() == "") {
        $email.addClass('is-invalid');
        event.preventDefault();
    }


  }


  cerrarSesion() {
    this.cuentaService.cerrarSesion().subscribe(response => {
      this.router.navigate(['/login/cuenta']);
    });
  }
}
