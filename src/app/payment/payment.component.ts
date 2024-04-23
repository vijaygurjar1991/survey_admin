import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/data.service';
import { UtilsService } from '../service/utils.service';
import { SurveyService } from '../service/survey.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  baseUrl = '';
  firstName: string = '';
  id: string = '';
  email: string = '';
  contactNo: string = '';
  centerId: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string;
  // selectedCountry: { id: string, name: string, images: string } | null = null;
  // selectedCountryId: string | null = null;
  zip: string = '';
  gstNumber: string = '';
  planId: string = '';
  
  constructor(private surveyservice: SurveyService, public themeService: DataService, private util: UtilsService, private httpClient: HttpClient, private router: Router, private visibilityService: DataService) {
     
  }
 

  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  userId: any;
  getMyAccount() {    
    this.userId = this.util.getUserId();
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.firstName = data.firstName;
      this.id = data.id
      this.email = data.email
      this.contactNo = data.contactNo
      this.centerId = data.centerId
    });
  }
 
  selectedPlan: string = ''; 
  selectedPlanName: string = ''; 

  subscriptionPlans: any[] = [ 
    { id: 'basic', name: 'Basic', price: 500 },
    { id: 'standard', name: 'Standard', price: 1200 },
    { id: 'premium', name: 'Premium', price: 2500 }
  ]; 
  // updateAmount(): void {
  //   const selectedPlan = this.subscriptionPlans.find(plan => plan.id === this.selectedPlan);
  //   if (selectedPlan) {
  //     this.amount = selectedPlan.price;
  //     this.selectedPlanName = selectedPlan.name;
  //   }
  // }
  ngOnInit() {    
    this.hideBreadcrumb();
    this.userId = this.util.getUserId();
    this.getMyAccount();
    //this.getCountries();
  }
  
  information: any[] = [];
  firstname: boolean = true
  lastname: boolean = true
  Contact: boolean = true
  emailaddress: boolean = true

  validateSurvey(): boolean {
    this.firstname = !!this.firstName && this.firstName.trim().length > 0;
    this.Contact = !!this.contactNo && this.contactNo.toString().trim().length > 0;
    this.emailaddress = !!this.email && this.email.trim().length > 0;

    // You might want to return whether all fields are valid
    return (
      this.firstname &&
      this.Contact &&
      this.emailaddress
    );
  }
//Pyament Gateway
  razorpayOptions: any = {};
  amount: any ;
  apiUrl = environment.apiUrl;
  
  submitForm(): void {
    if (!this.validateSurvey()) {
      this.util.showError('Please fill all required fields.');
      return;
    }
    const formData = {
      fullName: this.firstName,
      address: this.address,
      city: this.city,
      state: this.state,
      country: this.country,
      zip: this.zip,
      phone: this.contactNo,
      gstNumber: this.gstNumber,
      email: this.email,
      amount: this.amount,
      organizationId: this.centerId,
      planId: this.amount
    };
    this.postAmount(formData).subscribe((response: any) => { // Type assertion to any
        console.log('Response from server:', response);
        this.payNow(response, response.orderId); // Call the payNow function with order data to initiate Razorpay payment
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  postAmount(formData: any) {
    
    return this.httpClient.post(`${this.apiUrl}api/admin/${this.userId}/Payment/ProcessRequestOrder`, formData);
  }

  payNow(orderData: any, orderId: string): void {
    const razorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: orderData.amount * 100, // Convert amount to paisa (Razorpay expects amount in paisa)
      name: 'Scrip8',
      key: 'rzp_test_Ncll0VDPCO6Ffq', // Replace with your Razorpay key
      //image: 'https://mobile.angular.opinionest.com/manage/assets/images/logo/T-logo.png',
      prefill: {
        name: 'saryu sirohi',
        email: 'saryu@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#f05e16'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        }
      },
      handler: (response: any) => {
        console.log(response);
        // Handle payment success
        this.sendPaymentDetails(response.razorpay_payment_id, orderId);
      }
    };

    const razorpayInstance = new Razorpay(razorpayOptions);
    razorpayInstance.open();
  }
  sendPaymentDetails(paymentId: string, orderId: string): void {  
    const requestData = {
      rzp_paymentid: paymentId,
      rzp_orderid: orderId,
      organizationId: this.centerId
    };
    const apiUrl = `${environment.apiUrl}api/admin/${this.userId}/Payment/CompleteOrderProcess`;
    this.httpClient.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
      (response: any) => {
        alert('qwerty');
        console.log('Response:', response); // Log the response        
        if (response === 'Success') {
          console.log('Success:', response);
          this.router.navigate(['/thankyou']);  // Redirect to the thank you page
        } else {
          console.error('Error in response:', response); // Handle the error condition appropriately
        }
      },
      (error: any) => {
        console.error('HTTP Error:', error); // Log the HTTP error        
        // Handle the error response as plain text
        console.error('Server Error:', error); // Log the server error
        // Handle the server error condition appropriately
      }
    );
  }
 
}
