import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  constructor(public themeService: DataService, private modalService: NgbModal,) { }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
  showSweetAlert() {
    Swal.fire('update');
  }

}
