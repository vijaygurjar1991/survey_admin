import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-address-popup',
  templateUrl: './email-address-popup.component.html',
  styleUrls: ['./email-address-popup.component.css']
})
export class EmailAddressPopupComponent {
  @ViewChild('EmailAddressModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
