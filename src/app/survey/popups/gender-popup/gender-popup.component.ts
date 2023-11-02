import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gender-popup',
  templateUrl: './gender-popup.component.html',
  styleUrls: ['./gender-popup.component.css']
})
export class GenderPopupComponent {
  @ViewChild('GenderModal', { static: true }) modal!: ModalDirective;

  constructor() {
  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
