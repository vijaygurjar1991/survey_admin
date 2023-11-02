import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-age-popup',
  templateUrl: './age-popup.component.html',
  styleUrls: ['./age-popup.component.css']
})
export class AgePopupComponent {
  @ViewChild('AgeModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
