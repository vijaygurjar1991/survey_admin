import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  
  razorpayOptions: any = {};
  amount: any = ''; // Define amount variable
  centerId: any = ''; // Define centerId variable
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  submitForm(): void {
    const formData = {
      Amount: this.amount,
      CenterId: this.centerId
    };
    this.postAmount(formData)
      .subscribe((response: any) => { // Type assertion to any
        console.log('Response from server:', response);
        this.payNow(response, response.orderId); // Call the payNow function with order data to initiate Razorpay payment
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  postAmount(formData: { Amount: string; CenterId: string; }) {
    return this.httpClient.post(`${this.apiUrl}ProcessRequestOrder?Amount=${this.amount}&CenterId=${this.centerId}`, formData);
  }

  payNow(orderData: any, orderId: string): void {
    const razorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: orderData.amount * 100, // Convert amount to paisa (Razorpay expects amount in paisa)
      name: 'Script8',
      key: 'rzp_test_Ncll0VDPCO6Ffq', // Replace with your Razorpay key
      image: 'https://mobile.angular.opinionest.com/manage/assets/images/logo/T-logo.png',
      prefill: {
        name: 'saryu sirohi',
        email: 'saryu@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
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
