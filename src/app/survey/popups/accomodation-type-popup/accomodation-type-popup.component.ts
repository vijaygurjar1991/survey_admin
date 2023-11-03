import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-accomodation-type-popup',
  templateUrl: './accomodation-type-popup.component.html',
  styleUrls: ['./accomodation-type-popup.component.css']
})
export class AccomodationTypePopupComponent {
  @ViewChild('AccomodationTypeModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
