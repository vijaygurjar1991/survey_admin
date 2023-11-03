import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-store-popup',
  templateUrl: './store-popup.component.html',
  styleUrls: ['./store-popup.component.css']
})
export class StorePopupComponent {
  @ViewChild('StoreModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
