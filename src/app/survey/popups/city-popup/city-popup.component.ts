import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-city-popup',
  templateUrl: './city-popup.component.html',
  styleUrls: ['./city-popup.component.css']
})
export class CityPopupComponent {
  @ViewChild('CityModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) { }

  show() {
    this.modal.show();
    this.surveyservice.GetStateByCountryID(this.countryId).subscribe((data) => {
      this.countries = data;
      console.log("GetStateByCountryID "+this.countries)
    });
    
  }

  close() {
    this.modal.hide();
  }

  countryId = 'IN';
 

  countries: any[];





}
