import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-monthly-income-popup',
  templateUrl: './monthly-income-popup.component.html',
  styleUrls: ['./monthly-income-popup.component.css']
})
export class MonthlyIncomePopupComponent {
  @ViewChild('MonthlyIncomeModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {
  }

  show() {
    this.modal.show();
    this.getQuestions();
  }

  close() {
    this.modal.hide();
  }


  role: string;
  typeid = 5;

  monthlyincome: any[] = [];


  getQuestions() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.monthlyincome = resp.map(item => ({
          question: item.question,
          image: item.image,
          options: item.options.map((option: { id: number, option: string, image: string }) => ({
            id: option.id,
            option: option.option,
            image: option.image
          }))
        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }

  selectAllOptions() {
    if (this.monthlyincome && this.monthlyincome.length > 0) {
      const options = this.monthlyincome[0].options;

      // Check if all options are currently selected
      const allSelected = options.every((option: { selected: any; }) => option.selected);

      // Toggle the selection based on the current state
      for (const option of options) {
        option.selected = !allSelected;
      }
    }
  }



}
