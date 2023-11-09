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
  }

  close() {
    this.modal.hide();
  }

  ngOnInit(): void {
    this.getCountries();

  }

  // userId: number;
  // countries: { name: string, countryId: string }[] = [];

  // getCountries() {
  //   this.surveyservice.GetCountries(this.userId).subscribe({
  //     next: (resp: responseDTO[]) => {
  //       console.log('Response:', resp);
  //       this.countries = resp.map(item => ({ name: item.name, countryId: item.countryId }));
  //     },
  //     error: (err) => console.log("An Error occurred while fetching countries", err)
  //   });
  // }

  // statesbycountryid: { name: string, countryId: string }[] = []


  // getstates() {
  //   this.surveyservice.GetStateByCountryID(this.userId).subscribe({
  //     next: (resp: responseDTO[]) => {
  //       console.log('Response:', resp);
  //       this.statesbycountryid = resp.map(item => ({ name: item.name, countryId: item.countryId }));
  //     },
  //     error: (err) => console.log("An Error occurred while fetching countries", err)
  //   });
  // }

  userId: number;
  countries: { name: string, countryId: string }[] = [];
  statesbycountryid: { name: string, countryId: string }[] = [];

  getCountries() {
    this.surveyservice.GetCountries(this.userId).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response Countries:', resp);
        this.countries = resp.map(item => (
          {
            name: item.name,
            countryId: item.countryId,
            states: this.getStatesByCountryId(item.countryId),
          }
        ));

        // After fetching countries, call the method to get states

      },
      error: (err) => console.log("An Error occurred while fetching countries", err)
    });
  }

  getStatesByCountryId(country_id: any) {
    this.surveyservice.GetStateByCountryID(this.userId, country_id).subscribe({
      next: (resp: responseDTO[]) => {

        console.log('Response States:', resp);
        this.statesbycountryid = resp.map(item => ({ name: item.name, countryId: item.countryId }));

        this.displayStatesForMatchingCountryId();
      },
      error: (err) => console.log("An Error occurred while fetching states", err)
    });
  }

  displayStatesForMatchingCountryId() {

    const matchingStates = this.statesbycountryid.filter(state =>
      this.countries.some(country => country.countryId === state.countryId)
    );

    console.log('Matching States:', matchingStates);

  }



}
