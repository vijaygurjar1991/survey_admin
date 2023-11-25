import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';


@Component({
  selector: 'app-no-of-child-popup',
  templateUrl: './no-of-child-popup.component.html',
  styleUrls: ['./no-of-child-popup.component.css']
})
export class NoOfChildPopupComponent {
  @ViewChild('NumberOfChildModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {
  }

  show() {
    this.modal.show();
    this.getNoOfChild();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 7;

  noofchild: any[] = [];


  getNoOfChild() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.noofchild = resp.map(item => ({
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
