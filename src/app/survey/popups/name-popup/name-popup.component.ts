import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-name-popup',
  templateUrl: './name-popup.component.html',
  styleUrls: ['./name-popup.component.css']
})
export class NamePopupComponent {
  @ViewChild('NameModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
    this.getName();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 37;

  name: any[] = [];


  getName() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.name = resp.map(item => ({
          question: item.question,
          image: item.image,
        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }

}
