import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home-area-type-popup',
  templateUrl: './home-area-type-popup.component.html',
  styleUrls: ['./home-area-type-popup.component.css']
})
export class HomeAreaTypePopupComponent {
  @ViewChild('HomeAreaTypeModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
