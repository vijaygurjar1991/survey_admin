import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';

@Component({
  selector: 'app-gender-popup',
  templateUrl: './gender-popup.component.html',
  styleUrls: ['./gender-popup.component.css']
})
export class GenderPopupComponent {
  @ViewChild('GenderModal', { static: true }) modal!: ModalDirective;

  question: Question = new Question();
  optionsArr1: any[] = [];
  optionsArr2: any[] = [];
  filteredOptions: any[] = [];
  allOptions: any[] = [];
  groups: any[] = [];
  surveyId = 0;
  questionText: string = '';
  constructor(private surveyservice: SurveyService,private route: ActivatedRoute,private crypto: CryptoService) {
    this.route.paramMap.subscribe(params => {
      let _surveyId = params.get('param1');
      console.log("param1 Inside Gender Question",params.get('param1'))
      if (_surveyId) {
        this.surveyId = parseInt(this.crypto.decryptQueryParam(_surveyId));
        console.log("surveyId Inside Gender Question",this.surveyId)
      }
    });
  }

  show(surveyId:any) {
    this.getQuestions();
    this.intializeDefaultValue()
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 1;

  questions: any[] = [];


  getQuestions() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        this.modal.show();

        console.log('Response:', resp);
        this.questions = resp.map(item => ({
          question: item.question,
          image: item.image,
          options: item.options.map((option: { id: number, option: string, image: string }) => ({
            id: option.id,
            option: option.option,
            image: option.image
          }))
        }));
        if (this.questions && this.questions.length > 0) {
          console.log('Value of questionText 1:', this.questionText); 
          this.questionText = this.questions[0].question;
        }
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
    
  }

  selectedOptions: Set<number> = new Set<number>();


  selectAllOptions() {
    if (this.questions && this.questions.length > 0) {
      const options = this.questions[0].options;

      // Check if all options are currently selected
      const allSelected = options.every((option: { selected: any; }) => option.selected);

      // Toggle the selection based on the current state
      for (const option of options) {
        option.selected = !allSelected;
      }
    }
  }

  intializeDefaultValue() {
    console.log("Inside IntializeDefaultValue")
    this.question.questionTypeId = 7;
    this.question.surveyTypeId = this.surveyId;
    this.question.question = '';
    this.question.createdDate = this.getCurrentDateTime();
    this.question.modifiedDate = this.getCurrentDateTime();

    let newOption1 = new Option();
    newOption1.createdDate = this.getCurrentDateTime();
    newOption1.modifiedDate = this.getCurrentDateTime();
    newOption1.option = 'Male';
    this.optionsArr1.push(newOption1);

    let newOption2 = new Option();
    newOption2.createdDate = this.getCurrentDateTime();
    newOption2.modifiedDate = this.getCurrentDateTime();
    newOption2.option = 'Female';
    this.optionsArr1.push(newOption2);

    let newOption3 = new Option();
    newOption3.createdDate = this.getCurrentDateTime();
    newOption3.modifiedDate = this.getCurrentDateTime();
    newOption3.option = 'Non-Binary';
    this.optionsArr1.push(newOption3);

    
    this.filteredOptions.push(...this.optionsArr1, ...this.optionsArr2);
    this.allOptions.push(...this.optionsArr1, ...this.optionsArr2);

  }
  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }
  onContinue() {

    console.log('Value of questionText:', this.questionText); 
    this.question.question = this.questionText;
    console.log('Value of this.question.question:', this.question.question);

    this.question.options = this.allOptions;
    
      this.surveyservice.CreateGeneralQuestion(this.question).subscribe({
        next: (resp: any) => {
          Swal.fire('', 'Question Generated Sucessfully.', 'success');

          //let url = `/survey/manage-survey/${this.crypto.encryptParam(this.surveyId)}`;

          //this.router.navigateByUrl(url);
        },
        error: (err: any) => {
          Swal.fire('', err.error, 'error');
        }
      });
    console.log(this.question);
  }

}
