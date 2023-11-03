import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-m-slm-popup',
  templateUrl: './m-slm-popup.component.html',
  styleUrls: ['./m-slm-popup.component.css']
})
export class MSlmPopupComponent {
  @ViewChild('MSlmModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
