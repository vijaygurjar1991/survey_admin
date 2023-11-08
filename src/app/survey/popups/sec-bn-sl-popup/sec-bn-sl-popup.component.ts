import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sec-bn-sl-popup',
  templateUrl: './sec-bn-sl-popup.component.html',
  styleUrls: ['./sec-bn-sl-popup.component.css']
})
export class SecBnSlPopupComponent {
  @ViewChild('SecBnSlNpl', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
