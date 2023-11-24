import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { SurveyService } from 'src/app/service/survey.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-survey-listing',
  templateUrl: './survey-listing.component.html',
  styleUrls: ['./survey-listing.component.css']
})
export class SurveyListingComponent {
  surveyData: any;
  categoryList: any;
  selectedCategory: string = 'All Categories';
  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: SurveyService, private cdr: ChangeDetectorRef) {
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



  ngOnInit(): void {
    //debugger;
    this.visibilityService.closeSideBar();
    this.visibilityService.isSidebarVisibleSubject.next(false);

    this.role = localStorage.getItem("role")
    this.GetAllSurveyList()
    this.getNames()
  }

  GetAllSurveyList() {
    this.userId = localStorage.getItem("userId");
    this.themeService.GetSurveyList(this.userId).subscribe((data: any) => {
      this.surveyData = data;
      this.cdr.detectChanges();
    });
  }
  models: { id: number, name: string }[] = []; // Assuming 'id' is a number

  getNames() {
    this.themeService.GetCategories(this.userId).subscribe((data: any) => {
      console.log("categoryList", data)
      this.categoryList = data
    });
  }
}
