import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-locality-popup',
  templateUrl: './locality-popup.component.html',
  styleUrls: ['./locality-popup.component.css']
})
export class LocalityPopupComponent {

  @ViewChild('LocalityModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
