import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';



@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})



export class MenuTopComponent implements OnInit {
  numeroArticulosCarrito: number;

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit() {
    this.crearCarrito();
    this.getNumeroArticulosCarrito();
  }

  crearCarrito() {
    if (!localStorage.getItem('carrito')) {
      localStorage.setItem('carrito', '[]');
    }
  }

  getNumeroArticulosCarrito() {
    this.numeroArticulosCarrito = JSON.parse(localStorage.getItem('carrito')).length;
  }

  irCarrito() {
    window.location.href = "/tienda/carrito";
  }


  botonLogin() {
    this.autenticacionService.estaAutenticado().subscribe(response => {

      if (response.autenticado) {

        if (response.adminAutenticado) {
          window.location.href = '/admin';
        } else {
          this.router.navigate(['/cuenta']);
        }

      } else {
        this.router.navigate(['/login/cuenta']);
      }
    });
  }

  menu() {
    $('.dropdown-menu').toggleClass('show');
  }
}
