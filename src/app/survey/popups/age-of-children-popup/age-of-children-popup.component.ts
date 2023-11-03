import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-age-of-children-popup',
  templateUrl: './age-of-children-popup.component.html',
  styleUrls: ['./age-of-children-popup.component.css']
})
export class AgeOfChildrenPopupComponent {
  @ViewChild('AgeOfChildrenModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
