import { Component } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { SurveyService } from 'src/app/service/survey.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  // Tooltip
  showTooltip: { [key: string]: boolean } = {};
  userId: any;
  toggleTooltip(identifier: string) {
    this.showTooltip[identifier] = !this.showTooltip[identifier];
  }
  hideTooltip(identifier: string) {
      this.showTooltip[identifier] = false;
  }
// Tooltip

  baseUrl = '';
  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: SurveyService) {
    this.baseUrl = environment.baseURL;
  }
  ngOnInit(): void {
    this.getSurveyReportBySurveyId();
  }
  getSurveyReportBySurveyId() {
    this.themeService.getSurveyReportBySurveyId(this.userId).subscribe((data: any) => {
      console.log("reports", data)
    });
  }


}
