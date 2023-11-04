import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-industry-household-popup',
  templateUrl: './industry-household-popup.component.html',
  styleUrls: ['./industry-household-popup.component.css']
})
export class IndustryHouseholdPopupComponent {
  @ViewChild('IndustryHouseholdModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
