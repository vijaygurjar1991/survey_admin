import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Question } from 'src/app/models/question';
import { CryptoService } from 'src/app/service/crypto.service';
import { SurveyService } from 'src/app/service/survey.service';
import { Option } from 'src/app/models/option';
import Swal from 'sweetalert2';
import { responseGenericQuestion } from 'src/app/types/responseGenericQuestion';

interface State {
  stateId: string;
  name: string;
  selected: boolean;
}
export interface City {
  id: number;
  name: string;
  stateId: string;
  selected: boolean;
}

export interface StateCity {
  stateId: string;
  name: string;
  abbreviation: string;
  countryId: string;
  cities: City[];
}

@Component({
  selector: 'app-city-popup',
  templateUrl: './city-popup.component.html',
  styleUrls: ['./city-popup.component.css']
})
export class CityPopupComponent {
  @ViewChild('CityModal', { static: true }) modal!: ModalDirective;
  locations: State[] = [];
  state: StateCity[] = [];
  isPanIndiaShow: boolean = false;
  questions: Question[] = [];
  questionTypeId = 8;
  typeid = 9
  surveyId: any
  questionText: any
  countryId: any
  constructor(private surveyservice: SurveyService, private route: ActivatedRoute, private crypto: CryptoService, private router: Router) {
    this.route.paramMap.subscribe(params => {
      let _surveyId = params.get('param1');
      console.log("param1 Inside Gender Question", params.get('param1'))
      if (_surveyId) {
        console.log("surveyId Inside City Question First", this.crypto.decryptQueryParam(_surveyId))
        this.surveyId = parseInt(this.crypto.decryptQueryParam(_surveyId));
        console.log("surveyId Inside City Question", this.surveyId)
      }
    });
  }

  show() {
    this.surveyservice.getSurveyDetailsById(1, 1, this.surveyId).subscribe((data: any) => {
      console.log("Country Id : ", data)
      this.countryId = data.countryId
      if (this.countryId == "IN")
        this.isPanIndiaShow = true
      this.surveyservice.GetStateByCountryID(this.countryId).subscribe((data) => {
        this.countries = data;
        this.locations = data[0]?.states || [];
      });
      this.surveyservice.GetListOfCountry(this.countryId).subscribe((data) => {
        this.state = data[0]?.states || [];

      });

      this.getQuestions();
    });
    this.modal.show();

  }

  close() {
    this.modal.hide();
  }

  //countryId = 'IN';


  countries: any[];

  selectAllOptions() {
    const areAllSelected = this.locations.every(state => state.selected);

    this.locations.forEach(state => {
      state.selected = !areAllSelected;
    });
  }
  selectAllCityOptions(state: StateCity) {
    // Select all city checkboxes within the state
    state.cities.forEach(city => {
      city.selected = !city.selected;
    });
  }
  getSelectedStates(): State[] {
    return this.locations.filter(state => state.selected);
  }

  getSelectedCities(): City[] {
    const selectedCities: City[] = [];
    this.state.forEach(state => {
      state.cities.forEach(city => {
        if (city.selected) {
          selectedCities.push(city);
        }
      });
    });
    return selectedCities;
  }
  onConfirmSelection() {
    const selectedStates = this.getSelectedStates();
    const selectedCities = this.getSelectedCities();

    console.log('Selected States:', selectedStates);
    console.log('Selected Cities:', selectedCities);
    if (selectedStates.length > 0 && selectedCities.length > 0) {
      Swal.fire('', 'Please Select Either State Or City', 'error');
    } else if (selectedStates.length > 0 || selectedCities.length) {
      const currentDateTime = this.getCurrentDateTime();
      const currentQuestion = this.questions.length > 0 ? this.questions[0] : new Question();
      currentQuestion.questionTypeId = this.questionTypeId
      currentQuestion.surveyTypeId = this.surveyId
      currentQuestion.createdDate = this.getCurrentDateTime()
      currentQuestion.modifiedDate = this.getCurrentDateTime();
      currentQuestion.genericTypeId = this.typeid;
      currentQuestion.question = this.questionText;

      // Filter selected options for the current question
      currentQuestion.options = currentQuestion.options.filter(option => option.selected);
      currentQuestion.options.forEach(option => {
        option.createdDate = currentDateTime;
        option.modifiedDate = currentDateTime;
      });
      if (selectedCities.length > 0) {
        const selectedCityOptions: Option[] = selectedCities.map(city => ({
          id: 0,
          option: city.name,
          image: '',
          createdDate: currentDateTime,
          modifiedDate: currentDateTime,
          keyword: '', // Set other properties accordingly
          status: '',
          isRandomize: false,
          isExcluded: false,
          group: null,
          sort: 0,
          selected: false,
          isVisible: false,
          isSelected: false
        }));
        currentQuestion.options = selectedCityOptions
      } else {
        const selectedStateOptions: Option[] = selectedStates.map(city => ({
          id: 0,
          option: city.name,
          image: '',
          createdDate: currentDateTime,
          modifiedDate: currentDateTime,
          keyword: '', // Set other properties accordingly
          status: '',
          isRandomize: false,
          isExcluded: false,
          group: null,
          sort: 0,
          selected: false,
          isVisible: false,
          isSelected: false
        }));
        currentQuestion.options = selectedStateOptions
      }

      // Make an API call for each question with its selected options
      this.surveyservice.CreateGeneralQuestion(currentQuestion).subscribe({
        next: (resp: any) => {
          Swal.fire('', 'Question Generated Successfully.', 'success').then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        error: (err: any) => {

        }
      });
    } else {
      Swal.fire('', 'Please Select State Or City', 'error');
    }

    // You can perform further actions with the selected states and cities
  }
  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }
  getQuestions() {
    this.surveyservice.getGenericQuestionType1(this.typeid).subscribe({
      next: (resp: responseGenericQuestion[]) => {
        this.modal.show();

        this.questions = resp.map(item => {
          const question = new Question();
          question.id = item.questionId;
          question.question = item.question;
          question.image = item.image || '';
          return question;
        });

        if (this.questions && this.questions.length > 0) {
          this.questionText = this.questions[0].question;
          console.log("questionText", this.questionText)
        }
      },
      error: (err) => {
        console.log("An Error occurred while fetching questions", err);
        // Handle error - show a message or perform any necessary action
      }
    });
  }
}
