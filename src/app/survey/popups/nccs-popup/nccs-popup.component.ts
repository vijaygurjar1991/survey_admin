import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { responseGenericQuestion } from 'src/app/types/responseGenericQuestion';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-nccs-popup',
  templateUrl: './nccs-popup.component.html',
  styleUrls: ['./nccs-popup.component.css']
})
export class NccsPopupComponent {

  @ViewChild('NccsModal', { static: true }) modal!: ModalDirective;

  @Output() onSaveEvent = new EventEmitter();

  questions: Question[] = [];
  questionText: string = '';
  surveyId = 0;
  constructor(private surveyservice: SurveyService, private route: ActivatedRoute, private crypto: CryptoService, private router: Router, private utility: UtilsService) {

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
    this.getQuestions();
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
  getQuestions() {
    this.surveyservice.getGenericQuestionType1(this.typeid).subscribe({
      next: (resp: responseGenericQuestion[]) => {
        this.modal.show();

        this.questions = resp.map(item => {
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
      },
      error: (err) => {
        console.log("An Error occurred while fetching questions", err);
        // Handle error - show a message or perform any necessary action
      }
    });
  }
  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }

  isAtLeastOneOptionSelected(): boolean {
    return this.questions.some(question => question.options.some(option => option.selected));
  }
  continueClicked() {

    const currentDateTime = this.getCurrentDateTime();
    // Assuming 'questions' is an array containing multiple instances of the Question class

    // Check if at least one option is selected for all questions
    if (!this.questions.every(question => question.options.some(option => option.selected))) {
      this.utility.showError("Please select at least one option for each question");
      return;
    }

    let successfulAPICalls = 0; // Counter to track successful API calls
    let delayCounter = 0;
    for (let i = 0; i < this.questions.length; i++) {

      const currentQuestion = this.questions[i];
      console.log("currentQuestion", this.questions[i])
      // currentQuestion.questionTypeId = this.questionTypeId
      if (i === 1) {
        currentQuestion.questionTypeId = 7; // Set questionTypeId to 7 for the third question

      } else {
        currentQuestion.questionTypeId = this.questionTypeId
      }

      console.log(currentQuestion)
      currentQuestion.surveyTypeId = this.surveyId
      currentQuestion.createdDate = this.getCurrentDateTime()
      currentQuestion.modifiedDate = this.getCurrentDateTime();
      currentQuestion.genericTypeId = this.typeid
      currentQuestion.genericKey = i + 1



      // Filter selected options for the current question
      currentQuestion.options = currentQuestion.options.filter(option => option.selected);
      currentQuestion.options.forEach(option => {
        option.createdDate = currentDateTime;
        option.modifiedDate = currentDateTime;

      });
      if (!currentQuestion.options.some(option => option.selected)) {
        continue;
      }

      // Skip current question if no options are selected


      setTimeout(() => {
        this.surveyservice.CreateGeneralQuestion(currentQuestion).subscribe({
          next: (resp: any) => {
            console.log(`API call ${i + 1} successful`);
            successfulAPICalls++;

            if (successfulAPICalls === this.questions.length) {
              this.utility.showSuccess('Question Generated Successfully.');
              this.close();
              this.onSaveEvent.emit();
            }
          },
          error: (err: any) => {
            console.error(`Error in API call ${i + 1}:`, err);
          }
        });
      }, delayCounter * 1000); // Delay each API call by 'delayCounter' seconds
      delayCounter++;
    }

  }
}


