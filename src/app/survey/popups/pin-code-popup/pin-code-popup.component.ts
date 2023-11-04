import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pin-code-popup',
  templateUrl: './pin-code-popup.component.html',
  styleUrls: ['./pin-code-popup.component.css']
})
export class PinCodePopupComponent {
  @ViewChild('PinCodeModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
