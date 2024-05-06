import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { UtilsService } from '../service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  userId: any;
  firstName: any;
  lastName: any;
  email: any;
  contactNo: any;
  message: any;
  baseUrl: string;
  constructor(private utils: UtilsService, public themeService: DataService) {
    this.baseUrl = environment.baseURL;;
  }
  ngOnInit(): void {
    this.getMyAccount();
  }
  getMyAccount() {
    this.userId = this.utils.getUserId();
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.firstName = data.firstName;
      this.lastName = data.lastName
      this.email = data.email
      this.contactNo = data.contactNo
      
    });
  }
  // post data
  submitForm() {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNo: this.contactNo,
      message: this.message
    };

    this.themeService.sendContactData(formData).subscribe(response => {
      console.log('Form data sent successfully:', response);
      this.utils.showSuccess(response);
    }, error => {
      console.error('Error occurred while sending form data:', error);
      this.utils.showError(error);
    });
  }
}
