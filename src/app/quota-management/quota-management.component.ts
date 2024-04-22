import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quota-management',
  templateUrl: './quota-management.component.html',
  styleUrls: ['./quota-management.component.css']
})
export class QuotaManagementComponent {
  selectedQuestion: string;
  isQuotasVisible: boolean = false;
  showQuotasDiv: boolean = false;
  constructor( private visibilityService: DataService, private modalService : NgbModal) {
  }
  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }
  ngOnInit() {    
    this.hideBreadcrumb();
  } 
  showQuotas() {
    this.isQuotasVisible = true;
  }  
  open(contentInterlock: any) {
		this.modalService.open(contentInterlock)
	}
  // Show add quotas
  quotas: any[] = [{ selectedQuestion: 'Select Question', showQuotasDiv: false }];
  addQuota() {
    this.quotas.push({ selectedQuestion: '', showQuotasDiv: false });
  }

  showQuestionQuotas(index: number) {
    if (this.quotas[index].selectedQuestion !== 'Select Question') {
      this.quotas[index].showQuotasDiv = true;
    } else {
      this.quotas[index].showQuotasDiv = false;
    }
  }
  // Show and hide Census/Custom dive
  showCensusDiv: boolean = false;
  showCustomDiv: boolean = false;
  censusActive: boolean = false;
  customActive: boolean = false;
  toggleCensus() {
    this.showCensusDiv = true;
    this.showCustomDiv = false;
    this.censusActive = true;
    this.customActive = false;
  }
  toggleCustom() {
    this.showCensusDiv = false;
    this.showCustomDiv = true;
    this.censusActive = false;
    this.customActive = true;
  }
  toggleNone() {
    this.showCensusDiv = false;
    this.showCustomDiv = false;
    this.censusActive = false;
    this.customActive = false;
  }
  // Show and hide Census/Custom dive
  activeIndex: number = 0; // Initially set to 0 for the first item
  items: string[] = ['Gender', 'Age', 'Region']; // Array of dynamic items
  toggleActive(index: number) {
    this.activeIndex = index;
  }
  
}
