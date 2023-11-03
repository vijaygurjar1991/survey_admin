import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nccs-popup',
  templateUrl: './nccs-popup.component.html',
  styleUrls: ['./nccs-popup.component.css']
})
export class NccsPopupComponent {
  @ViewChild('NccsModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
