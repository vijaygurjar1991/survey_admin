import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-selfie-popup',
  templateUrl: './selfie-popup.component.html',
  styleUrls: ['./selfie-popup.component.css']
})
export class SelfiePopupComponent {
  @ViewChild('SelfieModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
