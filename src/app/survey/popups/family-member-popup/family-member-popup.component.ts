import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-family-member-popup',
  templateUrl: './family-member-popup.component.html',
  styleUrls: ['./family-member-popup.component.css']
})
export class FamilyMemberPopupComponent {
  @ViewChild('FamilyMemberModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
