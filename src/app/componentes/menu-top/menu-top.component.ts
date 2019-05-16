import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { CarritoService } from 'src/app/servicios/carrito.service';



@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})



export class MenuTopComponent implements OnInit {
  numeroArticulosCarrito: any;

  constructor(private carritoService: CarritoService, private autenticacionService: AutenticacionService, private router: Router) {
    this.carritoService.numeroArticulos.subscribe(
      (item) => {
        this.numeroArticulosCarrito = item;
      }
   );
  }

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
    this.carritoService.actualizarContador();
  }

  botonLogin() {
    this.autenticacionService.estaAutenticado().subscribe(response => {

      if (response.autenticado) {

        if (response.adminAutenticado) {
          let abrirPanel = confirm('¿Quieres abrir el panel de control?');
          if (abrirPanel) {
            window.location.href = "/admin";
          } else {
            this.router.navigate(['/cuenta']);
          }

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
