import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-name-popup',
  templateUrl: './name-popup.component.html',
  styleUrls: ['./name-popup.component.css']
})
export class NamePopupComponent {
  @ViewChild('NameModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
