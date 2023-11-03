import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-s-lsm-popup',
  templateUrl: './s-lsm-popup.component.html',
  styleUrls: ['./s-lsm-popup.component.css']
})
export class SLsmPopupComponent {

  @ViewChild('SLsmModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
