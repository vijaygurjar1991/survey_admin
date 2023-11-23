import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(public themeService: DataService) { }
  files: File[] = [];
  role: any;
  id: number;
  firstName: any;
  lastName: any;
  //password: any;
  status: "ACT";
  contactNo: Number;
  email: any;
  roleId: number = 0;
  image: any;

  password: string = '';

  generatePassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }

  onGeneratePassword() {
    // You can adjust the length of the password as needed
    this.password = this.generatePassword(10);
  }

  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  AddUser() {
    const dataToSend = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      status: this.status,
      contactNo: this.contactNo,
      email: this.email,
      roleId: this.roleId,
      image: this.image
    };
    console.log("dataToSend", dataToSend)
    this.themeService.AddNewUser(dataToSend).subscribe(
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


}
