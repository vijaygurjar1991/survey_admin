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
    this.getNccs();

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  ngOnInit(): void {
    this.getNccs();
  }


  role: string;
  userId: number;
  typeid = 3;

  nccs: {
    question: string,
    image: string | null,
    options: { id: number, option: string, image: string, selected: boolean }[]

  }[] = [];


  selectAllChecked = false;


  getNccs() {
    this.surveyservice.GetGenericQuestionType(this.userId, this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.nccs = resp.map(item => ({
          question: item.question,
          image: item.image,
          options: item.options.map((option: { id: number, option: string, image: string }) => ({
            id: option.id,
            option: option.option,
            image: option.image,
            selected: false
          }))
        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }
  selectAllOptions() {
    this.selectAllChecked = !this.selectAllChecked;

    // Loop through each question's options and set selected property
    this.nccs.forEach((question) => {
      question.options.forEach((option) => {
        option.selected = this.selectAllChecked;
      });
    });
  }


}
