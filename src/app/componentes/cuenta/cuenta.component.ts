import { Component, OnInit, ɵConsole } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from 'ng6-breadcrumbs';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  autenticado: boolean;
  usuario = [];
  historialPedidos = [];

  constructor(private autenticacionService: AutenticacionService, private cuentaService: CuentaService, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.titleService.setTitle('Detalles de la cuenta');
    this.estaAutenticado();
    this.getDetallesUsuario();
    this.getHistorialPedidos();
    this.parametrizarCaminoMigas();
  }

  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Cuenta', url: '/cuenta', params: []},
      {label: '', url: '', params: []},
    ])
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
    $('input').click(function(){$(this).removeClass('is-invalid');});
    $('input').blur(function(){$(this).removeClass('is-invalid');});

    let errores = false;

    if ($('#usuario').val() === '') {
      $('#usuario').addClass('is-invalid');
      errores = true;
    }

    if ($('#nombre').val() === '') {
      $('#nombre').addClass('is-invalid');
      errores = true;
    }

    if ($('#apellido').val() === '') {
      $('#apellido').addClass('is-invalid');
      errores = true;
    }

    if ($('#dni').val() === '' || !/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test($('#dni').val().toString()) && !/^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test($('#dni').val().toString())) {
      $('#dni').addClass('is-invalid');
      errores = true;
    }

    if ($('#direccion').val() === '') {
      $('#direccion').addClass('is-invalid');
      errores = true;
    }

    if ($('#email').val() === '' || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#email').val().toString())) {
      $('#email').addClass('is-invalid');
      errores = true;
    }


    // LLAMAMOS AL METODO ACTUALIZAR CUENTA DEL SERVICIO EN CASO DE QUE TODO ESTE BIEN
    if (!errores) {
      let data = {
        'usuario': $('#usuario').val(),
        'nombre': $('#nombre').val(),
        'apellido': $('#apellido').val(),
        'dni': $('#dni').val(),
        'direccion': $('#direccion').val(),
        'email': $('#email').val()
      };

      this.cuentaService.actualizarCuenta(data).subscribe(response => {
        if (response.cuentaActualizada) {
          alert('Has actualizado correctamente tu cuenta');
        }
      });

    }

  }


  getHistorialPedidos() {
    this.cuentaService.getHistorialPedidos().subscribe(
      response => {
        this.historialPedidos = response
        console.log(this.historialPedidos);
      }
    );
  }

  cerrarSesion() {
    this.cuentaService.cerrarSesion().subscribe(response => {
      this.router.navigate(['/login/cuenta']);
    });
  }
}
