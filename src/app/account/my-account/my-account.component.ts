import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  imageName: any;
  constructor(public themeService: DataService, private modalService: NgbModal, private cdr: ChangeDetectorRef,private util: UtilsService) { }
  files: File[] = [];
  role: any;
  id: number = 0;
  firstName: any;
  lastName: any;
  email: any;
  contactNo: any
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
    //this.role = localStorage.getItem("role")
    this.role = this.util.getRole();
    this.getMyAccount()
  }

  userId: any;


  getMyAccount() {
    //this.userId = localStorage.getItem("userId");
    this.userId = this.util.getUserId();
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.firstName = data.firstName;
      this.lastName = data.lastName
      this.id = data.id
      this.email = data.email
      this.contactNo = data.contactNo
      this.roleId = data.roleId
      this.image = data.image
      this.cdr.detectChanges();
    });
  }

  postData() {
    const imageName = this.image.split('\\').pop() || this.image;
    const dataToSend = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNo: this.contactNo,
      roleId: this.roleId,
      imageName: imageName,
      status:'ACT'
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


  // Upload Image
  
  selectedImage: string | ArrayBuffer | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      this.onUpload(file); // Trigger upload after selecting the file
    };
    reader.readAsDataURL(file);
  }
}

onUpload(file: File): void {
  if (!file) {
    console.error('No file selected.');
    return;
  }
  console.log("inside onUpload");
  this.themeService.uploadImage(file,this.userId).subscribe(
    (response) => {
      console.log('Upload successful:', response);
      // Handle response from server
    },
    (error) => {
      console.error('Error occurred while uploading:', error);
      // Handle error
    }
  );
}

}
