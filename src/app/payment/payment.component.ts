import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) {}

  submitForm(): void {
    const formData = {
      Amount: this.amount,
      CenterId: this.centerId
    };
    this.postAmount(formData)
      .subscribe(response => {
        console.log('Response from server:', response);
        this.payNow(response); // Call the payNow function with order data to initiate Razorpay payment
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  postAmount(formData: { Amount: string; CenterId: string; }) {
    return this.httpClient.post(`${this.apiUrl}ProcessRequestOrder?Amount=${this.amount}&CenterId=${this.centerId}`, formData);
  }

  payNow(orderData: any): void {
    const razorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: orderData.amount * 100, // Convert amount to paisa (Razorpay expects amount in paisa)
      name: 'Script8',
      key: 'rzp_test_Ncll0VDPCO6Ffq', // Replace with your Razorpay key
      image: 'https://i.imgur.com/FApqk3D.jpeg',
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
      }
    };

    const razorpayInstance = new Razorpay(razorpayOptions);
    razorpayInstance.open();
  }
}
