import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-foreign-country-travelled-popup',
  templateUrl: './foreign-country-travelled-popup.component.html',
  styleUrls: ['./foreign-country-travelled-popup.component.css']
})
export class ForeignCountryTravelledPopupComponent {
  @ViewChild('ForeignCountryTravelledModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }


  ngOnInit(): void {
    this.getForeignCountryTravelled();
  }


  role: string;
  userId: number;
  typeid = 22;

  foreigncountrytravelled: any[] = [];


  getForeignCountryTravelled() {
    this.surveyservice.GetGenericQuestionType(this.userId, this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.foreigncountrytravelled = resp.map(item => ({
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
