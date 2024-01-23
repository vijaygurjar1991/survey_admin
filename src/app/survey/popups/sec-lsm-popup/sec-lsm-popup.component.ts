import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { responseGenericQuestion } from 'src/app/types/responseGenericQuestion';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';
import jsonData from '../../../../assets/seclsmQuestion.json';


@Component({
  selector: 'app-sec-lsm-popup',
  templateUrl: './sec-lsm-popup.component.html',
  styleUrls: ['./sec-lsm-popup.component.css']
})
export class SecLsmPopupComponent {

  @ViewChild('SecLsmModal', { static: true }) modal!: ModalDirective;

  questions: Question[] = [];
  questionText: string = '';
  surveyId = 0;
  constructor(private surveyservice: SurveyService, private route: ActivatedRoute, private crypto: CryptoService, private router: Router) {

    this.route.paramMap.subscribe(params => {
      let _surveyId = params.get('param1');
      console.log("param1 Inside Gender Question", params.get('param1'))
      if (_surveyId) {
        this.surveyId = parseInt(this.crypto.decryptQueryParam(_surveyId));
        console.log("surveyId Inside NCCS Question", this.surveyId)
      }
    });
  }

  show() {
    this.modal.show();
    //this.getNccs();
    this.getQuestionsFromFile();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 3;
  questionTypeId = 8;


  nccs: {
    question: string,
    image: string | null,
    options: { id: number, option: string, image: string, selected: boolean }[];
    selectAllChecked: boolean;

  }[] = [];

  selectAllOptions(questionIndex: number) {
    const question = this.questions[questionIndex];
    if (question) {
      const areAllSelected = question.options.every(option => option.selected);
  
      question.options.forEach(option => {
        option.selected = !areAllSelected;
      });
    }
  }
  trackByFn(index: number, question: Question): number {
    return question.id; // Assuming 'id' is a unique identifier for each question
  }
  getQuestionsFromFile() {
    this.questions = jsonData.map((item: any) => {
      const question = new Question();
      question.id = item.questionId;
      question.question = item.question;
      question.image = item.image || '';
    
      question.options = item.options.map((optionItem: { id: number, option: string, image: string }) => {
        const option = new Option();
        option.id = optionItem.id;
        option.option = optionItem.option;
        option.image = optionItem.image || '';
        return option;
      });
    
      return question;
    });
    
    if (this.questions && this.questions.length > 0) {
      this.questionText = this.questions[0].question;
    }
  }
  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }
  continueClicked() {

    const currentDateTime = this.getCurrentDateTime();
    // Assuming 'questions' is an array containing multiple instances of the Question class

    let successfulAPICalls = 0;
    for (let i = 0; i < this.questions.length; i++) {
      const currentQuestion = this.questions[i];
      currentQuestion.questionTypeId = this.questionTypeId
      currentQuestion.surveyTypeId = this.surveyId
      currentQuestion.createdDate = this.getCurrentDateTime()
      currentQuestion.modifiedDate = this.getCurrentDateTime();
      currentQuestion.genericTypeId=this.typeid

      // Filter selected options for the current question
      currentQuestion.options = currentQuestion.options.filter(option => option.selected);
      currentQuestion.options.forEach(option => {
        option.createdDate = currentDateTime;
        option.modifiedDate = currentDateTime;
      });

      const selectedOptions = currentQuestion.options.filter(option => option.selected);

    if (selectedOptions.length === 0) {
      // No options selected for this question, skip API call
      successfulAPICalls++; // Increment the counter as this operation counts as a successful API call for the progress check

      if (successfulAPICalls === this.questions.length) {
        Swal.fire('', 'Question Generated Successfully.', 'success').then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }

      continue; // Skip this question and move to the next one
    }

      // Make an API call for each question with its selected options
      this.surveyservice.CreateGeneralQuestion(currentQuestion).subscribe({
        next: (resp: any) => {
          // Handle success response for each question
          console.log(`API call ${i + 1} successful`);
          // Add further logic if needed upon successful creation of each question
          successfulAPICalls++;

          if (successfulAPICalls === this.questions.length) {
            Swal.fire('', 'Question Generated Successfully.', 'success').then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        },
        error: (err: any) => {
          // Handle error response for each question
          console.error(`Error in API call ${i + 1}:`, err);
          // Perform any necessary actions upon error for each question
        }
      });
    }
    //window.location.reload()

  }
}
