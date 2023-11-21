import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  constructor(public themeService: DataService, private modalService: NgbModal, private cdr: ChangeDetectorRef) { }
  files: File[] = [];
  role: any;
  id: number = 0;
  firstName: any;
  lastName: any;
  email: any;
  roleId: number = 0;
  image: any;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
  showSweetAlert() {
    Swal.fire('update');
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role")
    this.getMyAccount()
  }

  userId: any;


  getMyAccount() {
    this.userId = localStorage.getItem("userId");
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.firstName = data.firstName;
      this.lastName = data.lastName
      this.id = data.id
      this.email = data.email
      this.roleId = data.roleId
      this.image = data.image
      this.cdr.detectChanges();
    });
  }

  postData() {
    const dataToSend = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      roleId: this.roleId,
      image: this.image
    };
    console.log("dataToSend", dataToSend)
    this.themeService.CreateMyAccount(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        Swal.fire('', response, 'success');
        // Handle response based on the server behavior
      },
      error => {
        console.error('Error occurred while sending POST request:', error);
        // Handle error, if needed
      }
    );
  }

  updatepassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      Swal.fire('Error Occurs', 'All fields are required.', 'error');
    }
    else if (this.confirmPassword != this.newPassword) {
      Swal.fire('Error Occurs', 'New password and confirm password should be same.', 'error');
    } else {
      const dataToSend2 = {
        id: this.id,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };
      console.log("dataToSend", dataToSend2)
      this.themeService.ChangePassword(dataToSend2).subscribe({
        next: (response) => {
          console.log('Response from server:', response);
          Swal.fire('', response, 'success');
          // Handle response based on the server behavior
        },
        error: (err) => {
          console.error('Error occurred while sending POST request:', err);
          Swal.fire('Error Occurs', err, 'error');

          // Handle error, if needed
        }
      });
    }
  }

}
