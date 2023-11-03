import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-geo-location-popup',
  templateUrl: './geo-location-popup.component.html',
  styleUrls: ['./geo-location-popup.component.css']
})
export class GeoLocationPopupComponent {
  @ViewChild('GeoLocationModal', { static: true }) modal!: ModalDirective;

  constructor() {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
