import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expert-aid',
  templateUrl: './expert-aid.component.html',
  styleUrls: ['./expert-aid.component.css']
})
export class ExpertAidComponent {
  constructor(private modalService : NgbModal){}

  openLg(form: any) {
    this.modalService.open(form, { size: 'lg', centered: true });
  }
}
