import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-state-popup',
  templateUrl: './state-popup.component.html',
  styleUrls: ['./state-popup.component.css']
})
export class StatePopupComponent {
  @ViewChild('StateModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
