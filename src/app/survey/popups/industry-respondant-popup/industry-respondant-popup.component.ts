import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-industry-respondant-popup',
  templateUrl: './industry-respondant-popup.component.html',
  styleUrls: ['./industry-respondant-popup.component.css']
})
export class IndustryRespondantPopupComponent {
  @ViewChild('IndustryRespondantModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
