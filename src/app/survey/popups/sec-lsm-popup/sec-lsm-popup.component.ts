import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
import { UtilsService } from 'src/app/service/utils.service';


@Component({
  selector: 'app-sec-lsm-popup',
  templateUrl: './sec-lsm-popup.component.html',
  styleUrls: ['./sec-lsm-popup.component.css']
})
export class SecLsmPopupComponent {

  @ViewChild('SecLsmModal', { static: true }) modal!: ModalDirective;

  @Output() onSaveEvent = new EventEmitter();

  questions: Question[] = [];
  questionText: string = '';
  surveyId = 0;
  newOptionValue: string = '';
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
    this.getQuestionsFromFile();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 0;
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
      if (i === 2) {
        currentQuestion.questionTypeId = 7; // Set questionTypeId to 7 for the third question

      } else {
        currentQuestion.questionTypeId = this.questionTypeId
      }
      // currentQuestion.questionTypeId = this.questionTypeId;
      currentQuestion.surveyTypeId = this.surveyId;
      currentQuestion.createdDate = this.getCurrentDateTime();
      currentQuestion.modifiedDate = this.getCurrentDateTime();
      currentQuestion.genericTypeId = this.typeid;

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
          this.utility.showSuccess('Question Generated Successfully');
          window.location.reload()
        }

        continue; // Skip this question and move to the next one
      }

      setTimeout(() => {
        this.surveyservice.CreateGeneralQuestion(currentQuestion).subscribe({
          next: (resp: any) => {
            // Handle success response for each question
            console.log(`API call ${i + 1} successful`);
            // Add further logic if needed upon successful creation of each question
            successfulAPICalls++;

            if (successfulAPICalls === this.questions.length) {
              this.utility.showSuccess('Question Generated Successfully.');
              this.close();
              this.onSaveEvent.emit();
            }
          },
          error: (err: any) => {
            // Handle error response for each question
            console.error(`Error in API call ${i + 1}:`, err);
            this.utility.showError('Error');
            // Perform any necessary actions upon error for each question
          }
        });
      }, 1000 * i); // Introducing 1-second delay multiplied by the index to space out API calls
    }

    //window.location.reload()

  }
  // addQuestion() {
  //   console.log(this.questions)
  //   if (this.questions.length > 0) {
  //     const previousQuestion = this.questions[this.questions.length - 1];
  //     console.log("previousQuestion", previousQuestion)
  //     // Check if the previous question has the shouldAddOption flag set
  //     if (previousQuestion.shouldAddOption && this.newOptionValue.trim() !== '') {
  //       const newOption = new Option();
  //       newOption.id = previousQuestion.options.length + 1;
  //       newOption.option = this.newOptionValue;
  //       newOption.selected = false;

  //       previousQuestion.options.push(newOption);

  //       // Clear the global newOptionValue after adding an option
  //       this.newOptionValue = '';
  //     }
  //   }

  //   const newQuestion = new Question();
  //   newQuestion.id = this.questions.length + 1;
  //   newQuestion.question = '';
  //   //newQuestion.options = [];
  //   newQuestion.shouldAddOption = true;  // Set to true for the newly added question

  //   const defaultOption = new Option();
  //   defaultOption.id = 1;
  //   defaultOption.option = ''; // Set a default option text if needed
  //   defaultOption.selected = false;

  //   newQuestion.options = [defaultOption];

  //   this.questions.push(newQuestion);
  //   console.log(this.questions)
  // }
  addQuestion() {
    if (this.questions.length > 0) {
      const previousQuestion = this.questions[this.questions.length - 1];

      // Check if the previous question has the shouldAddOption flag set
      if (previousQuestion.shouldAddOption && this.newOptionValue.trim() !== '') {
        const newOption = new Option();
        newOption.id = previousQuestion.options.length + 1;
        newOption.option = this.newOptionValue;
        newOption.selected = false;

        previousQuestion.options.push(newOption);

        // Clear the global newOptionValue after adding an option
        this.newOptionValue = '';
      }
    }

    const newQuestion = new Question();
    newQuestion.id = this.questions.length + 1;
    newQuestion.question = '';
    newQuestion.shouldAddOption = true; // Set to true for the newly added question

    const defaultOption = new Option();
    defaultOption.id = 1;
    defaultOption.option = ''; // Set a default option text if needed
    defaultOption.selected = false;

    newQuestion.options = [defaultOption];

    this.questions.push(newQuestion);
  }

  addOption(questionIndex: number) {
    const question = this.questions[questionIndex];
    console.log(question)
    if (question && question.shouldAddOption) {
      const newOption = new Option();
      newOption.id = question.options.length + 1;
      newOption.option = this.newOptionValue; // Assign the entered value to newOption.option
      newOption.selected = false;

      question.options.push(newOption);

      const previousOptionIndex = question.options.length - 2; // Index of the previously added option
      if (previousOptionIndex >= 0) {
        question.options[previousOptionIndex].option = this.newOptionValue;
      }
      this.newOptionValue = ''; // Clear the global newOptionValue after adding an option
    }
  }
  updateNewOptionValue(event: any) {
    this.newOptionValue = (event.target as HTMLInputElement)?.value;
  }
}
