import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { DetalleArticuloComponent } from 'src/app/componentes/detalle-articulo/detalle-articulo.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { MapaWebComponent } from './componentes/mapa-web/mapa-web.component';

const routes: Routes = [
  { path: '', component:  TiendaComponent },
  { path: 'tienda', component:  TiendaComponent },
  { path: 'tienda/articulo/:k', component:  DetalleArticuloComponent },
  { path: 'tienda/carrito', component:  CarritoComponent },
  { path: 'login/:destino', component:  LoginComponent },
  { path: 'signup', component:  SignupComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'contacto', component:  ContactoComponent },
  { path: 'mapaweb', component:  MapaWebComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
