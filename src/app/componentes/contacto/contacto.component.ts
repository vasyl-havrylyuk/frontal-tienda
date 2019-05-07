import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactoService } from 'src/app/servicios/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  constructor(private titleService: Title, private contactoService: ContactoService) { }

  ngOnInit() {
    this.titleService.setTitle('Contacto');
  }


  validar() {
    var hayErrores = false;

    let $datos = [
      $('#nombre'), $('#email'), $('#asunto')
    ];

    for (let i = 0; i < $datos.length; i++) {
      if ($datos[i].val() === "") {
        $datos[i].addClass('is-invalid');
        $datos[i].click(function(){$(this).removeClass('is-invalid');});
        $datos[i].blur(function(){$(this).removeClass('is-invalid');});
        hayErrores = true;
      }
    }

    if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test($datos[1].val().toString())) {
      $datos[1].addClass('is-invalid');
      hayErrores = true;
    }


    if (!hayErrores) {
      let data = {
        "nombre":$datos[0].val(),
        "email":$datos[1].val(),
        "asunto":$datos[2].val()
      };

      this.contactoService.enviarMensaje(data).subscribe(response => {
        if (response.mensajeEnviado) {
          alert('Mensaje enviado correctamente');
          window.location.href = "/tienda";
        } else {
          alert('Hubo algún error al enviar el mensaje');
        }
      });
    }
  }
}
