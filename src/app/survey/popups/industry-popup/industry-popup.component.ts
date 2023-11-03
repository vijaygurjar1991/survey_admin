import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-industry-popup',
  templateUrl: './industry-popup.component.html',
  styleUrls: ['./industry-popup.component.css']
})
export class IndustryPopupComponent {
  @ViewChild('IndustryModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
