import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbsModule } from "ng6-breadcrumbs";


import { AppComponent } from './app.component';
import { MenuTopComponent } from './componentes/menu-top/menu-top.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { MaterialModule } from './modulos/material.module';
import { DetalleArticuloComponent } from './componentes/detalle-articulo/detalle-articulo.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { LogoTopComponent } from './componentes/logo-top/logo-top.component';
import { MapaWebComponent } from './componentes/mapa-web/mapa-web.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    FooterComponent,
    TiendaComponent,
    ContactoComponent,
    HeaderComponent,
    LoginComponent,
    DetalleArticuloComponent,
    CarritoComponent,
    SignupComponent,
    CuentaComponent,
    LogoTopComponent,
    MapaWebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    BreadcrumbsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
