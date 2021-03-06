import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { LogService } from 'src/app/servicios/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mensaje = '';

  constructor(private logService: LogService, private autenticacionService: AutenticacionService, private route: ActivatedRoute, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {    
    this.titleService.setTitle('Login');
    this.parametrizarCaminoMigas();
  }

  parametrizarCaminoMigas() {
    this.route.params.subscribe(res => {
      this.breadcrumbs.store([
        {label: 'Login', url: '/login/'+res['destino'], params: []},
        {label: '', url: '', params: []},
      ])
    });
  }

  autenticar(event: any) {
    event.preventDefault();

    const target = event.target;
    const usuario = target.querySelector('#usuario').value;
    const password = target.querySelector('#password').value;

    this.autenticacionService.autenticar(usuario, password).subscribe(response => {
      this.route.params.subscribe(response2 => {
        const destino = response2['destino'];

        if (response.autenticado) {

          if (response.usuarioActivado) {
            this.logService.loguearDato(['info', response.usuario + ' se ha logueado']).subscribe(response => {});

            if (response.adminAutenticado) {
              let abrirPanel = confirm('¿Quieres abrir el panel de control?');

              if (abrirPanel) {
                window.location.href = "/admin";
              } else {
                this.router.navigate(['/cuenta']);
              }


            } else {
              switch (destino) {
                case 'carrito':
                  this.router.navigate(['/tienda/'+destino]);
                  break;
                case 'cuenta':
                  this.router.navigate(['/' + destino]);
                  break;

                  
              } 
            }


            

            
          } else {
            this.mensaje = 'No has activado tu cuenta';
          }

        } else {
          this.mensaje = 'El usuario y/o contraseña incorrectos';
        }

      });
    });
  }

}
