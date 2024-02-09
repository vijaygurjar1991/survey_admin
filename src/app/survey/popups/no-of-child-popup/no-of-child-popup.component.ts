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
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-no-of-child-popup',
  templateUrl: './no-of-child-popup.component.html',
  styleUrls: ['./no-of-child-popup.component.css']
})
export class NoOfChildPopupComponent {
  @ViewChild('NumberOfChildModal', { static: true }) modal!: ModalDirective;

  questions: Question[] = [];
  surveyId = 0;
  questionTypeId = 7;
  baseUrl = '';
  constructor(private surveyservice: SurveyService, private route: ActivatedRoute, private crypto: CryptoService, private router: Router) {
    this.baseUrl = environment.baseURL;
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
    //this.getNoOfChild();
    this.getQuestions();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 7;

  noofchild: any[] = [];

  getQuestions() {
    this.surveyservice.getGenericQuestionType1(this.typeid).subscribe({
      next: (resp: responseGenericQuestion[]) => {
        this.modal.show();

        this.questions = resp.map(item => {
          const question = new Question();
          question.id = item.questionId;
          question.question = item.question;
          question.image = item.image || ''; // Handling null image

          // Assign other properties to the 'question' object from 'ResponseDTO' if needed

          // Assign options
          question.options = item.options.map((optionItem: { id: number, option: string, image: string }) => {
            const option = new Option();
            option.id = optionItem.id;
            option.option = optionItem.option;
            option.image = optionItem.image || ''; // Handling null image for options if required
            // Assign other properties to the 'option' object from 'ResponseDTO' if needed
            return option;
          });

          return question;
        });
      },
      error: (err) => console.log("An Error occurred while fetching questions", err)
    });
  }
  selectOption(option: Option) {
    option.selected = !option.selected; // Toggle selection on click
  }
  selectedQuestionTypes: number[] = [];

  selectedOptions: Set<number> = new Set<number>();


  selectAllOptions() {
    if (this.questions && this.questions.length > 0) {
      const options = this.questions[0]?.options;
      const allSelected = options.every(option => option.selected);

      for (const option of options) {
        option.selected = !allSelected;
      }
    }
  }
  trackByFn(index: number, question: Question): number {
    return question.id; // Assuming 'id' is a unique identifier for each question
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
      currentQuestion.genericTypeId = this.typeid

      // Filter selected options for the current question
      currentQuestion.options = currentQuestion.options.filter(option => option.selected);
      currentQuestion.options.forEach(option => {
        option.createdDate = currentDateTime;
        option.modifiedDate = currentDateTime;
      });

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
                //window.location.reload();
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

  }
  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }

}
