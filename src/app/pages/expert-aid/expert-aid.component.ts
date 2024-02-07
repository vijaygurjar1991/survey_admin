import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpertAid } from 'src/app/models/expert-aid';
import { ExpertAidServices } from 'src/app/models/expert-aid-services';
import { SurveyService } from 'src/app/service/survey.service';
import { UtilsService } from 'src/app/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expert-aid',
  templateUrl: './expert-aid.component.html',
  styleUrls: ['./expert-aid.component.css']
})
export class ExpertAidComponent {

  expertAid: ExpertAid = new ExpertAid();
  expertAidService:ExpertAidServices [] = [];
  constructor(private modalService : NgbModal,private surveyservice:SurveyService,private utillService:UtilsService){}

  openLg(form: any) {
    this.modalService.open(form, { size: 'lg', centered: true });
  }
  selectedItems: string[] = [];
  toggleCartItem(item: string) {
    if (this.selectedItems.includes(item)) {
      this.removeFromCart(item);
    } else {
      this.addToCart(item);
    }
  }
  addToCart(item: string) {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
    }
  }

  removeFromCart(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }

  }
  selectable: boolean = true; // Define the selectable property
  removable: boolean = true; // Define the removable property
  toggleService(service: string) {
    const index = this.selectedItems.indexOf(service);
    if (index !== -1) {
      this.selectedItems.splice(index, 1); // Remove item if already selected
    } else {
      this.selectedItems.push(service); // Add item if not selected
    }
  }
  name:string;
  projectType:string
  startDate:string
  endDate:string
  email:string
  mobile:number
  comments:string

  onSaveExpertAid():void{

    this.expertAid.name=this.name
    this.expertAid.projectType=this.projectType
    this.expertAid.startDate=this.startDate
    this.expertAid.endDate=this.endDate
    this.expertAid.email=this.email
    this.expertAid.mobile=this.mobile
    this.expertAid.comments=this.comments
    this.expertAid.centerId=this.utillService.getCenterId();

    this.selectedItems.forEach(item => {
      const expertAidService = new ExpertAidServices();
      expertAidService.name = item;
      this.expertAidService.push(expertAidService);
    });

    this.expertAid.expertAidServices=this.expertAidService

    this.surveyservice.createExpertAid(this.expertAid).subscribe({
      next: (resp: any) => {
        Swal.fire('', 'ExpertAid Generated Sucessfully.', 'success');
      },
      error: (err: any) => {
        Swal.fire('', err.error, 'error');
      }
    });

  }
}
