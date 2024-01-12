import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

interface State {
  stateId: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-city-popup',
  templateUrl: './city-popup.component.html',
  styleUrls: ['./city-popup.component.css']
})
export class CityPopupComponent {
  @ViewChild('CityModal', { static: true }) modal!: ModalDirective;
  locations: State[] = [];
  isPanIndiaShow:boolean=false;

  constructor(private surveyservice: SurveyService) { }

  show() {
    this.modal.show();
    if(this.countryId=="IN")
    this.isPanIndiaShow=true

    this.surveyservice.GetStateByCountryID(this.countryId).subscribe((data) => {
      this.countries = data;
      this.locations = data[0]?.states || [];
    });
    
  }

  close() {
    this.modal.hide();
  }

  countryId = 'IN';
 

  countries: any[];

  selectAllOptions() {
    const areAllSelected = this.locations.every(state => state.selected);

    this.locations.forEach(state => {
      state.selected = !areAllSelected;
    });
  }
  
}
