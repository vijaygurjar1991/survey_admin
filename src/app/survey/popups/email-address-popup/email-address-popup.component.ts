import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-email-address-popup',
  templateUrl: './email-address-popup.component.html',
  styleUrls: ['./email-address-popup.component.css']
})
export class EmailAddressPopupComponent {
  @ViewChild('EmailAddressModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
    this.getEmailAddress();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 38;

  emailaddress: any[] = [];


  getEmailAddress() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.emailaddress = resp.map(item => ({
          question: item.question,
          image: item.image
        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }

}
