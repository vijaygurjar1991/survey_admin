import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-nccs-popup',
  templateUrl: './nccs-popup.component.html',
  styleUrls: ['./nccs-popup.component.css']
})
export class NccsPopupComponent {

  @ViewChild('NccsModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {
  }

  show() {
    this.modal.show();
    this.getNccs();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 3;

  nccs: {
    question: string,
    image: string | null,
    options: { id: number, option: string, image: string, selected: boolean }[];
    selectAllChecked: boolean;

  }[] = [];





  getNccs() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        // console.log('Response:', resp);
        this.nccs = resp.map(item => ({
          question: item.question,
          image: item.image,
          options: item.options.map((option: { id: number, option: string, image: string }) => ({
            id: option.id,
            option: option.option,
            image: option.image,
            selected: false
          })),
          selectAllChecked: false
        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }
  selectAllOptions(questionIndex: number) {
    this.nccs[questionIndex].selectAllChecked = !this.nccs[questionIndex].selectAllChecked;

    // Loop through options for the specific question and set selected property
    this.nccs[questionIndex].options.forEach((option) => {
      option.selected = this.nccs[questionIndex].selectAllChecked;
    });
  }


}
