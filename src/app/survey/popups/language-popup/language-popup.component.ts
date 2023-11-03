import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-language-popup',
  templateUrl: './language-popup.component.html',
  styleUrls: ['./language-popup.component.css']
})
export class LanguagePopupComponent {
  @ViewChild('LanguageModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
