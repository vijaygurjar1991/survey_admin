import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-language-you-know-popup',
  templateUrl: './language-you-know-popup.component.html',
  styleUrls: ['./language-you-know-popup.component.css']
})
export class LanguageYouKnowPopupComponent {
  @ViewChild('LanguageYouKnowModel', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
