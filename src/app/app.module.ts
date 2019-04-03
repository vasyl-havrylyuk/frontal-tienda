import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuTopComponent } from './componentes/menu-top/menu-top.component';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { BannerPublicidadComponent } from './componentes/banner-publicidad/banner-publicidad.component';
import { MaterialModule } from './modulos/material.module';
import { DetalleArticuloComponent } from './componentes/detalle-articulo/detalle-articulo.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    HomeComponent,
    FooterComponent,
    TiendaComponent,
    ContactoComponent,
    HeaderComponent,
    LoginComponent,
    BannerPublicidadComponent,
    DetalleArticuloComponent,
    CarritoComponent,
    SignupComponent,
    CuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
