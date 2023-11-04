import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home-accessories-popup',
  templateUrl: './home-accessories-popup.component.html',
  styleUrls: ['./home-accessories-popup.component.css']
})
export class HomeAccessoriesPopupComponent {
  @ViewChild('HomeAccessoriesModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
