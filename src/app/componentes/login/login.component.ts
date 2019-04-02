import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginIncorrecto = false;

  constructor(private autenticacionService: AutenticacionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {  }

  autenticar(event: any) {
    event.preventDefault();

    const target = event.target;
    const usuario = target.querySelector('#usuario').value;
    const password = target.querySelector('#password').value;

    this.autenticacionService.autenticar(usuario, password).subscribe(response => {
      this.route.params.subscribe(response2 => {
        const destino = response2['destino'];

        if (response.autenticado) {
          if (response.adminAutenticado) {
            window.location.href = '/admin';
          } else {
            switch (destino) {
              case 'carrito':
                this.router.navigate(['/tienda/' + destino]);
                break;

                case 'cuenta':
                  this.router.navigate(['/' + destino]);
                  break;
            }
          }
        } else {
          this.loginIncorrecto = true;
        }

      });
    });
  }

}
