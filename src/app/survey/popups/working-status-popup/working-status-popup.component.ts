import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-working-status-popup',
  templateUrl: './working-status-popup.component.html',
  styleUrls: ['./working-status-popup.component.css']
})
export class WorkingStatusPopupComponent {
  @ViewChild('WorkingStatusModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
