import { Component, OnInit } from '@angular/core';
import { RutinasService } from 'src/app/servicios/rutinas.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {
  menuNiveles = [];
  rutinas = [];
  rutinasFiltradas = [];

  constructor(private rutinasService: RutinasService) { }

  ngOnInit() {
    this.getRutinas();
    this.getMenuNiveles();
  }

  getRutinas() {
    this.rutinasService.getRutinas().subscribe(response => {
      this.rutinas = response;
      this.rutinasFiltradas = response;
    });
  }

  getMenuNiveles() {
    this.rutinasService.getMenuNiveles().subscribe(response => this.menuNiveles = response);
  }

  filtrarPorDificultad(dificultad) {
    this.rutinas = this.rutinasFiltradas.filter(response => response.nivel.indexOf(dificultad) !== -1);
    console.log(this.rutinasFiltradas);
  }
}
