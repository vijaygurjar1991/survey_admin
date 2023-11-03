import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-marital-status-new-popup',
  templateUrl: './marital-status-new-popup.component.html',
  styleUrls: ['./marital-status-new-popup.component.css']
})
export class MaritalStatusNewPopupComponent {
  @ViewChild('MartialStatusModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
