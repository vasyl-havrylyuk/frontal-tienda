import { Component, OnInit, NgZone } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/servicios/compra.service';
import { Title } from '@angular/platform-browser';
import { reject } from 'q';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LogService } from 'src/app/servicios/log.service';

declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito = [];
  logueado: boolean = false;
  addScript: boolean = false;
  finalAmount = this.getTotalCarrito();
  public payPalConfig?: IPayPalConfig;


  constructor(private logService: LogService, private ngZone: NgZone, private carritoService: CarritoService, private spinnerService: SpinnerService, private autenticacionService: AutenticacionService, private compraService: CompraService, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }


  ngOnInit() {
    this.titleService.setTitle('Carrito');
    this.carrito = this.getCarrito();
    this.estaAutenticado();
    this.parametrizarCaminoMigas();
    this.initPaypalConfig();
  }


  private initPaypalConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AdLTFQnKvS1JkakBg2cfBd2C3RF78ahhzPMsP8kbryj6rvg4jnZ10X1XiQbco0aiq3hyDa1QgoB-mbN6',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.finalAmount
            },
            items: []
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          this.finalizarCompra()
        });
      },
      onClientAuthorization: (data) => {},
      onCancel: (data, actions) => {
        this.spinnerService.eliminar();
      },
      onError: err => {},
      onClick: () => {
        this.spinnerService.crear('Procesando compra');
      },
    };
  }




  parametrizarCaminoMigas() {
    this.breadcrumbs.store([
      {label: 'Tienda', url: '/tienda', params: []},
      {label: 'Carrito', url: 'tienda/carrito', params: []},
      {label: '', url: '', params: []},
    ])
  }
  
  getCarrito() {
    return JSON.parse(localStorage.getItem('carrito'));
  }

  setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  getTotalCarrito() {
    this.carrito = this.getCarrito();
    let tmp = 0;

    for (let i = 0; i < this.carrito.length; i++) {
      tmp += parseFloat(this.carrito[i].totalArticulo);
    }

    return tmp.toFixed(2);
  }

  eliminarDelCarrito(event: any, articulo) {
    const tmp = this.getCarrito();
    let $articulo = $(event.target).parent().parent().parent().parent(); 
    
    $($articulo).hide("slow", () => {
      $($articulo).remove();
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].k === articulo.k) {
          tmp.splice(tmp.indexOf(tmp[i]), 1);
          this.setCarrito(tmp);
          break;
        }
      }
  
      this.carritoService.actualizarContador();
  
      if (tmp.length <= 0) {
        this.router.navigate(['/tienda']);
      } else {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/tienda/carrito'])
        })
      }
    });
  }


  vaciarCarrito() {
    this.setCarrito([]);
    this.carritoService.actualizarContador();
    this.router.navigate(['/tienda']);
  }

  carritoValido() {
    this.carrito = this.getCarrito();

    if (this.carrito.length >= 1) {
      return true;
    } else {
      return false;
    }
  }


  finalizarCompra() {
    
    if (this.carritoValido()) {
      this.compraService.procesarCompra(this.carrito).subscribe(response2 => {
        if (response2.correcto) {
          this.setCarrito([]);
          this.carritoService.actualizarContador();
          this.spinnerService.eliminar();
          this.logService.loguearDato(['info', response2.usuario + ' ha realizado el pedido #' + response2.pedido]).subscribe(response => {});
          alert('Su compra ha sido procesada, se le he enviado\nun correo de confirmación');
          this.ngZone.run(() => this.router.navigate(['/cuenta']));
        }
      });
    }

  }

  estaAutenticado() {
    this.autenticacionService.estaAutenticado().subscribe(response => {
      if (response.autenticado) {
        this.logueado = true;
      }
    });
  }

}
