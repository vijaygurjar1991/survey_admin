import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-no-of-child-popup',
  templateUrl: './no-of-child-popup.component.html',
  styleUrls: ['./no-of-child-popup.component.css']
})
export class NoOfChildPopupComponent {
  @ViewChild('NumberOfChildModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
