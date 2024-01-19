import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { SurveyService } from 'src/app/service/survey.service';
import { FormControl } from '@angular/forms';
import { UtilsService } from 'src/app/service/utils.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-listing',
  templateUrl: './survey-listing.component.html',
  styleUrls: ['./survey-listing.component.css']
})
export class SurveyListingComponent {
  surveyData: any;
  categoryList: any;
  selectedCategory: string = 'All Categories';
  constructor(private visibilityService: DataService, private util: UtilsService, private modalService: NgbModal, public themeService: SurveyService, private cdr: ChangeDetectorRef) {
    visibilityService.closeSideBar();
  }
  files: File[] = [];
  role: any;
  id: number = 0;
  name: any;
  status: any;
  categoryId: any;
  categoryName: any;
  userId: any;
  userName: any;
  image: any;
  isadminsuperadmin: boolean = false
  isActive: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1
  totalItemsCount: number = 20
  currentPage: number = 1
  ngOnInit(): void {
    //debugger;
    this.visibilityService.closeSideBar();
    this.visibilityService.isSidebarVisibleSubject.next(false);

    this.role = this.util.getRole();
    console.log("role", this.role)
    this.role = this.role.toLowerCase()

    if (this.role == 'admin' || this.role == 'superadmin') {
      this.isadminsuperadmin = true;
    }
    this.getAllSurveyList(this.pageNumber, this.pageSize)
    this.getNames()
  }

  getAllSurveyList(pageNumber: number, pageSize: number) {
    this.themeService.getSurveyListWithPage(pageNumber, pageSize).subscribe((data: any) => {
      this.surveyData = data.surveyType;
      this.totalItemsCount = data.totalCount;
      // alert(this.totalItemsCount);
      this.cdr.detectChanges();
    });
  }
  models: { id: number, name: string }[] = []; // Assuming 'id' is a number

  getNames() {
    this.themeService.GetCategories().subscribe((data: any) => {
      console.log("categoryList", data)
      this.categoryList = data
    });
  }
  toggleSlider(event: Event, itemId: number, item: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const originalStatus = item.status;
    if (this.role === 'admin' || this.role === 'superadmin') {
      let surveyStatus = isChecked ? 'ACT' : 'DEL';
      const dataToSend = {
        surveyId: itemId,
        surveyStatus: surveyStatus
      };
      console.log("dataToSend", dataToSend)
      this.themeService.updateSurveyStatus(dataToSend).subscribe(
        response => {
          console.log('Response from server:', response);
        },
        error => {
          console.error('Error occurred while sending POST request:', error);
          Swal.fire('', error, 'error');
          item.status = originalStatus;
        }
      );
    } else {
      // User doesn't have sufficient permissions
      console.log('Insufficient permissions to toggle');
      Swal.fire('', 'You have no permissions', 'error');
      if (item.status !== originalStatus) {
        item.status = originalStatus;
      }
      // Additional action or feedback for insufficient permissions
    }
  }
  onPageChange(pageNumber: number) {
    console.log(pageNumber);
    // Handle page change event
    this.pageNumber = pageNumber;
    this.getAllSurveyList(this.pageNumber, this.pageSize)
      this.currentPage = this.pageNumber
    // You can also fetch data for the selected page here based on the pageNumber
  }
  jumpToPage() {
    // Add any necessary validation logic before emitting the pageChange event
    if (this.currentPage > 0 && this.currentPage <= Math.ceil(this.totalItemsCount / this.pageSize)) {
      this.onPageChange(this.currentPage);
    }
  }
  onPageSizeChange(){
    this.onPageChange(this.pageNumber)
  }


}
