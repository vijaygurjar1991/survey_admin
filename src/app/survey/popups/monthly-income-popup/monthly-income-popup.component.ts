import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-monthly-income-popup',
  templateUrl: './monthly-income-popup.component.html',
  styleUrls: ['./monthly-income-popup.component.css']
})
export class MonthlyIncomePopupComponent {
  @ViewChild('MonthlyIncomeModal', { static: true }) modal!: ModalDirective;

  constructor() {
  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
