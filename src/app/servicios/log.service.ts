import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) {  }
  
  loguearDato(data) {
    return this.http.post('/admin/loguearDato', {data});
  }


    /*
    $.post("/admin/loguearDato", {}, function(){
      console.log("s");
    });*/
}

