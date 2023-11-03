import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kids-count-popup',
  templateUrl: './kids-count-popup.component.html',
  styleUrls: ['./kids-count-popup.component.css']
})
export class KidsCountPopupComponent {
  @ViewChild('KidsCountModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
