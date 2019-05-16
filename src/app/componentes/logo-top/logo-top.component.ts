import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-top',
  templateUrl: './logo-top.component.html',
  styleUrls: ['./logo-top.component.scss']
})
export class LogoTopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  recargarComponente() {
    this.router.navigateByUrl('/tienda', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/'])
    })
  }

}
