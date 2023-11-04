import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-audio-gender-detection-popup',
  templateUrl: './audio-gender-detection-popup.component.html',
  styleUrls: ['./audio-gender-detection-popup.component.css']
})
export class AudioGenderDetectionPopupComponent {
  @ViewChild('AudioGenderDetectionModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
