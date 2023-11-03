import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-f-lsm-popup',
  templateUrl: './new-f-lsm-popup.component.html',
  styleUrls: ['./new-f-lsm-popup.component.css']
})
export class NewFLsmPopupComponent {
  @ViewChild('NewFLsmModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
