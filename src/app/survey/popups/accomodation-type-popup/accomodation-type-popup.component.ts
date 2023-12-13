import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-accomodation-type-popup',
  templateUrl: './accomodation-type-popup.component.html',
  styleUrls: ['./accomodation-type-popup.component.css']
})
export class AccomodationTypePopupComponent {
  @ViewChild('AccomodationTypeModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
    this.getAccomodationType();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 35;

  accomodationtype: any[] = [];


  getAccomodationType() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.accomodationtype = resp.map(item => ({
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

}
