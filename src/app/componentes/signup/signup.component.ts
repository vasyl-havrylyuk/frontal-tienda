import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsModule, BreadcrumbsService } from 'ng6-breadcrumbs';
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

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

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

    this.crearSpinner();

    this.registroService.registrarUsuario(this.formulario.value).subscribe(response => {
      $('#signupLoadWrapper').remove();
      
      if (response.registrado) {
        $('#envioMensaje').modal('show');
        setTimeout(function() {
          document.location.href = '/login/cuenta';
        }, 3500);
      } else {
        for (const key in response) {
          $('#' + key).parent().append('<div class="text-danger mb-3 error">'+response[key]+'</div>');
        }
      }



    });
  }

  crearSpinner() {
    let $signupLoadWrapper = $('<div id="signupLoadWrapper"></div>').appendTo(document.body);
    $signupLoadWrapper.css({
        "position":"fixed", 
        "left":"0", 
        "top":"0", 
        "right":"0", 
        "bottom":"0", 
        "background":"rgba(254, 254, 254, 0.91)", 
        "z-index":"1000", 
        "display":"none",
        "text-align":"center"
      })
      .fadeIn(300);

    let $spinner = $('<i class="fas fa-sync fa-spin"></i>').appendTo($signupLoadWrapper);
    $spinner.css({
      "font-size": "25vw",
      "margin-top": "10vw"
    });
  }

}

