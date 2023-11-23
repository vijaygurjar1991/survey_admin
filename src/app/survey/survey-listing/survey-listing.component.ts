import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-survey-listing',
  templateUrl: './survey-listing.component.html',
  styleUrls: ['./survey-listing.component.css']
})
export class SurveyListingComponent {
  surveyData: any;

  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: SurveyService, private cdr: ChangeDetectorRef) { }
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
    this.role = localStorage.getItem("role")
    this.GetAllSurveyList()
  }

  GetAllSurveyList() {
    this.userId = localStorage.getItem("userId");
    this.themeService.GetSurveyList(this.userId).subscribe((data: any) => {
      this.surveyData = data;
      this.cdr.detectChanges();
    });
  }
}
