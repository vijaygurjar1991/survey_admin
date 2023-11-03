import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-foreign-country-travelled-popup',
  templateUrl: './foreign-country-travelled-popup.component.html',
  styleUrls: ['./foreign-country-travelled-popup.component.css']
})
export class ForeignCountryTravelledPopupComponent {
  @ViewChild('ForeignCountryTravelledModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
