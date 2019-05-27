import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  crear(text: string) {
    let $signupLoadWrapper = $('<div id="signupLoadWrapper"></div>').appendTo(document.body);
    let $headerText = $('<h2 class="headerTextSpinner">' + text + '</div>').appendTo($signupLoadWrapper);
    $signupLoadWrapper.fadeIn(300);

    let $spinner = $('<i class="fas fa-sync fa-spin spinner"></i>').appendTo($signupLoadWrapper);
  }

  eliminar() {
    $('#signupLoadWrapper').remove();
  }
}
