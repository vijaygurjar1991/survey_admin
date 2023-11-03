import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-old-f-lsm-popup',
  templateUrl: './old-f-lsm-popup.component.html',
  styleUrls: ['./old-f-lsm-popup.component.css']
})
export class OldFLsmPopupComponent {
  @ViewChild('OldFLsmModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
