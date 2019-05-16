import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  crear() {
    let $signupLoadWrapper = $('<div id="signupLoadWrapper"></div>').appendTo(document.body);
    $signupLoadWrapper.fadeIn(300);
    let $spinner = $('<i class="fas fa-sync fa-spin spinner"></i>').appendTo($signupLoadWrapper);
  }

  eliminar() {
    $('#signupLoadWrapper').remove();
  }
}
