import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent {
  @ViewChild('HouseholdModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  ngOnInit(): void {
    this.getQuestions();
  }


  role: string;
  userId: number;
  typeid = 4;

  householdincome: {
    question: string,
    image: string | null,
    options: { id: number, option: string, image: string }[]
  }[] = [];


  getQuestions() {
    this.surveyservice.GetGenericQuestionType(this.userId, this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.householdincome = resp.map(item => ({
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
