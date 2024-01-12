import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-flsm-popup',
  templateUrl: './flsm-popup.component.html',
  styleUrls: ['./flsm-popup.component.css']
})
export class FlsmPopupComponent {
  @ViewChild('FlsmModal', { static: true })  flsmModal!: ModalDirective;

}
