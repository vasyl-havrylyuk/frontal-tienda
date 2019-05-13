import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  formulario: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Registro');
    this.establecerValidaciones();
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

  get f() { return this.formulario.controls; }

  registro() {
      this.submitted = true;

      if (this.formulario.invalid) {
        return;
      }

      $('#envioMensaje').modal('show');

      this.registroService.registrarUsuario(this.formulario.value).subscribe(response => {
        if (response.registrado) {
          setTimeout(function() {
            document.location.href = '/login/cuenta';
          }, 3500);
        }
      });
  }

}

