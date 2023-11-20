import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-family-member-popup',
  templateUrl: './family-member-popup.component.html',
  styleUrls: ['./family-member-popup.component.css']
})
export class FamilyMemberPopupComponent {
  @ViewChild('FamilyMemberModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  ngOnInit(): void {
    this.getFamilyMember();
  }


  role: string;
  userId: number;
  typeid = 6;

  familymember: {
    question: string,
    image: string | null,
    options: { id: number, option: string, image: string }[]
  }[] = [];


  getFamilyMember() {
    this.surveyservice.GetGenericQuestionType(this.userId, this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.familymember = resp.map(item => ({
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
