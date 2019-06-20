import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsModule, BreadcrumbsService } from 'ng6-breadcrumbs';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { LogService } from 'src/app/servicios/log.service';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  formulario: FormGroup;
  submitted = false;
  resultado: any;

  constructor(private logService: LogService, private formBuilder: FormBuilder, private spinnerService: SpinnerService, private registroService: RegistroService, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.setTitle('Registro');
    this.establecerValidaciones();
    this.quitarErrores();
    this.parametrizarCaminoMigas();
  }

  setTitle(titulo) {
    this.titleService.setTitle(titulo);
  }

  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Registro', url: '/signup', params: []},
      {label: '', url: '', params: []},
    ])
  }

  establecerValidaciones() {
    this.formulario = this.formBuilder.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dni: ['', [Validators.required, Validators.pattern(/(^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$)|(^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$)/i)]],
      direccion: ['', Validators.required]
    });
  }

  quitarErrores() {
    $('input').focus(function(){
      $(this).parent().children('.error').remove();
    });
  }

  get f() { return this.formulario.controls; }

  registro() {
    $('.error').remove();

    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }

    this.spinnerService.crear('Procesando el registro');

    this.registroService.registrarUsuario(this.formulario.value).subscribe(response => {
      this.spinnerService.eliminar();

      if (response.registrado) {
        $('#envioMensaje').modal('show');
        setTimeout(function() {
          window.location.href = '/login/cuenta';
        }, 3500);
        
        this.logService.loguearDato(['info', response.usuario + ' se ha registrado']).subscribe(response => {});
      } else {
        for (const key in response) {
          $('#' + key).parent().append('<div class="text-danger mb-3 error">'+response[key]+'</div>');
        }
      }

    });
  }

}

