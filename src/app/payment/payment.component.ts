import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/data.service';
import { UtilsService } from '../service/utils.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private util: UtilsService, private httpClient: HttpClient, private router: Router, private visibilityService: DataService) {
    visibilityService.articleVisible.next(false);
    
  }
  hideHeader() {
    this.visibilityService.toggleHeaderVisibility(false);
  }
  showHeader() {
    this.visibilityService.toggleHeaderVisibility(true);
  }
  hideSideBar() {
    this.visibilityService.toggleNavbarVisibility(false);
  }
  showSideBar() {
    this.visibilityService.toggleNavbarVisibility(true);
  }

  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  ShowBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  userId: any;
  
  ngOnInit() {
    this.hideHeader();
    this.hideSideBar();
    this.hideBreadcrumb();
    this.userId = this.util.getUserId();
  }
 
  subscriptionPlans: any[] = [
    { id: 'basic', name: 'Basic', price: 500 },
    { id: 'standard', name: 'Standard', price: 1200 },
    { id: 'premium', name: 'Premium', price: 2500 }
  ];
  subscriptionPlan: any = ''; 

  razorpayOptions: any = {};
  amount: any = this.subscriptionPlans.find(plan => plan.id === 'basic')?.price;
  centerId: any = ''; 
  apiUrl = environment.apiUrl;

  // updateAmount() {
  //   const selectedPlan = this.subscriptionPlans.find(plan => plan.id === this.subscriptionPlan);
  //   if (selectedPlan) {
  //     this.amount = selectedPlan.price;
  //   }
  // }

  submitForm(): void {
    const formData = {
      Amount: this.amount,
      CenterId: this.centerId
    };
    this.postAmount(formData).subscribe((response: any) => { // Type assertion to any
        console.log('Response from server:', response);
        this.payNow(response, response.orderId); // Call the payNow function with order data to initiate Razorpay payment
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  postAmount(formData: { Amount: string; CenterId: string; }) {
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
      rzp_orderid: orderId
    };
    const apiUrl = `${environment.apiUrl}CompleteOrderProcess?rzp_paymentid=${paymentId}&rzp_orderid=${orderId}`;
    this.httpClient.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
      (response: any) => {
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
