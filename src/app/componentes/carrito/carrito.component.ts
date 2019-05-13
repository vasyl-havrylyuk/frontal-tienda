import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/servicios/compra.service';
import { Title } from '@angular/platform-browser';
import { reject } from 'q';
import { BreadcrumbsService } from 'ng6-breadcrumbs';

declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit, AfterViewChecked {
  carrito = [];
  logueado: boolean = false;

  addScript: boolean = false;

  finalAmount = this.getTotalCarrito();

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AdLTFQnKvS1JkakBg2cfBd2C3RF78ahhzPMsP8kbryj6rvg4jnZ10X1XiQbco0aiq3hyDa1QgoB-mbN6',
      production: 'EJPF5gIDfWmERlCKBvca-PxvZSCg9Awn2EV9z7sYdVriXEtGrrmMQyOGuLZWYC5bIERPIQ4RmYYlxJHD'
    },
    commit: true,
   
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [{ 
            amount: { 
              total: this.finalAmount, 
              currency: 'EUR' 
            } 
          }]
        }
      });
    },
    
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.finalizarCompra();
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript && $('#paypal-checkout-btn').length) {
      this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      })
    }
  }

  
  addPaypalScript() {
    this.addScript = true;
    return new Promise(resolve => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  constructor(private autenticacionService: AutenticacionService, private compraService: CompraService, private router: Router, private titleService: Title, private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.titleService.setTitle('Carrito');
    this.carrito = this.getCarrito();
    this.estaAutenticado();
    this.parametrizarCaminoMigas();
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

  eliminarDelCarrito(articulo) {
    const tmp = this.getCarrito();

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].k === articulo.k) {
        tmp.splice(tmp.indexOf(tmp[i]), 1);
        this.setCarrito(tmp);
        break;
      }
    }
    
    if (tmp.length <= 0) {
      window.location.href = "/tienda";
    } else {
      window.location.href = "/tienda/carrito";
    }
    
  }

  vaciarCarrito() {
    this.setCarrito([]);
    window.location.href = "/tienda";
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
          this.carrito = [];
          this.setCarrito(this.carrito);
          alert('Compra procesada correctamente');
          window.location.href = "/cuenta";
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


  loguearse() {
    this.router.navigate(['/login/carrito']);
  }

}
