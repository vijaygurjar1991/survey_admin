import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-listing',
  templateUrl: './survey-listing.component.html',
  styleUrls: ['./survey-listing.component.css']
})
export class SurveyListingComponent {
  suveryListingTable = [
    { id: 1, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries' , 
    creatorName: 'Rishabh', 
    isChecked: false },
    { id: 2, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries' , 
    creatorName: 'Rishabh', 
    isChecked: false },
    { id: 3, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries' , 
    creatorName: 'Rishabh', 
    isChecked: false },
    { id: 4, surveyName: 'ED-Tech Brand Ranking', surveyCategory: 'Cosmetics, Personal care, Toiletries' , 
    creatorName: 'Rishabh', 
    isChecked: false },
  ];
  selectAllChecked = false;
  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.suveryListingTable.forEach((item) => {
      item.isChecked = this.selectAllChecked;
    });
  }
}
