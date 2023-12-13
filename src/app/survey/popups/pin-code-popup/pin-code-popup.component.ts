import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';

@Component({
  selector: 'app-pin-code-popup',
  templateUrl: './pin-code-popup.component.html',
  styleUrls: ['./pin-code-popup.component.css']
})
export class PinCodePopupComponent {
  @ViewChild('PinCodeModal', { static: true }) modal!: ModalDirective;

  constructor(private surveyservice: SurveyService) {

  }

  show() {
    this.modal.show();
    this.getPincode();
  }

  close() {
    this.modal.hide();
  }

  role: string;
  typeid = 39;

  pincode: any[] = [];


  getPincode() {
    this.surveyservice.GetGenericQuestionType(this.typeid).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.pincode = resp.map(item => ({
          question: item.question,
          image: item.image,

        }));
      },
      error: (err) => console.log("An Error occur while fetching questions", err)
    });
  }

}
