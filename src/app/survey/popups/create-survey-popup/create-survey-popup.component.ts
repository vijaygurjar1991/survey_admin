import { Component, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SurveyService } from 'src/app/service/survey.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-survey-popup',
  templateUrl: './create-survey-popup.component.html',
  styleUrls: ['./create-survey-popup.component.css']
})
export class CreateSurveyPopupComponent {

  @ViewChild('CreateSurveyModal', { static: true }) modal!: ModalDirective;

  surveyName: any;
  categoryId: number;
  newsurveyId: number;
  selectedOption: any;
  searchControl = new FormControl();
  options: { id: number, name: string }[] = [];
  filteredOptions: Observable<{ id: number, name: string }[]> | undefined;
  selectedCategory: { id: number, name: string } | null = null;
  userId = 0;

  constructor(private surveyservice: SurveyService,
    private router: Router,
    private crypto: CryptoService,
    private auth: AuthService) {


    // this.filteredOptions = this.searchControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );

  }

  show() {
    this.modal.show();
    this.getNames();
  }

  close() {
    this.modal.hide();
  }

  getNames() {
    this.surveyservice.GetCategories().subscribe(response => {

      const result = Object.keys(response).map((key) => response[key]);

      const models: { id: number; name: string }[] = result.map((value: any) => ({
        id: value['id'],
        name: value['name']
      }));

      this.options = models;
    });
  }



  _filter(value: string): { id: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue) || option.id.toString().includes(filterValue)
    );
  }

  filterOptions(e: MatAutocompleteSelectedEvent) {
    this.categoryId = e.option.value;
    this.selectedOption = e.option.viewValue;
  }


  CreateSurvey() {
    const dataToSend = {
      surveyName: this.surveyName,
      categoryId: this.categoryId
    };
    console.log("dataToSend", dataToSend)
    this.surveyservice.CreateSurvey(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        this.newsurveyId = response;

        if (this.newsurveyId) {
          const encryptedId = this.crypto.encryptParam(`${this.newsurveyId}`);
          const url = `/survey/manage-survey/${encryptedId}`;
          this.modal.hide();

          this.router.navigateByUrl(url);
          if(this.router.url.includes('/manage-survey')){
            location.reload();
          }
        }
      },
      error => {
        console.error('Error occurred while sending POST request:', error);
        Swal.fire('', error, 'error');
      }
    );


  }
}
