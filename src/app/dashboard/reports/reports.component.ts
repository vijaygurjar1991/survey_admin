import { Component } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  suveryListingTable = [
    {
      id: 1, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries',
      creatorName: 'Rishabh',
      isChecked: false
    },
    {
      id: 2, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries',
      creatorName: 'Rishabh',
      isChecked: false
    },
    {
      id: 3, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries',
      creatorName: 'Rishabh',
      isChecked: false
    },
    {
      id: 4, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries',
      creatorName: 'Rishabh',
      isChecked: false
    },
  ];
  selectAllChecked = false;
  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.suveryListingTable.forEach((item) => {
      item.isChecked = this.selectAllChecked;
    });
  }
  baseUrl = '';
  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: DataService) {
    this.baseUrl = environment.baseURL;
  }
}
