import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-old-sec-popup',
  templateUrl: './old-sec-popup.component.html',
  styleUrls: ['./old-sec-popup.component.css']
})
export class OldSecPopupComponent {
  @ViewChild('OldSecModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
