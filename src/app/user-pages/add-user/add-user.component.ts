import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/service/utils.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // Tooltip
  showTooltip: { [key: string]: boolean } = {};
  toggleTooltip(identifier: string) {
    this.showTooltip[identifier] = !this.showTooltip[identifier];
  }
  hideTooltip(identifier: string) {
      this.showTooltip[identifier] = false;
  }
// Tooltip
  baseUrl = '';
  constructor(public themeService: DataService, private utility: UtilsService) {
    this.baseUrl = environment.baseURL;
  }
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
  centerId: number = this.utility.getCenterId();
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

    if (!this.validateSurvey()) {
      this.utility.showError('Please fill all required fields.');
      return;
    }

    const dataToSend = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      status: this.status,
      contactNo: this.contactNo,
      email: this.email,
      roleId: this.roleId,
      centerId: this.centerId,
      image: this.image
    };
    console.log("dataToSend", dataToSend)
    this.themeService.AddNewUser(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        if (response == '"UserAlreadyExits"') {
          this.utility.showError("User Already Exist");
        } else {
          this.utility.showSuccess('New User Created Successfully');

        }
        // this.utility.showSuccess(response);
        // Swal.fire('', response, 'success');
        // Handle response based on the server behavior
      },
      error => {
        this.utility.showError(error);
        console.error('Error occurred while sending POST request:', error);
        // Handle error, if needed
      }
    );
  }

  information: any[] = [];
  firstNamerequired: boolean = true
  lastNamerequired: boolean = true
  phone: boolean = true
  roletype: boolean = true
  emailaddress: boolean = true
  passwordtype: boolean = true
  phoneLengthError: boolean = true;
  touched: boolean = false;

  validateSurvey(): boolean {
    this.firstNamerequired = !!this.firstName && this.firstName.trim().length > 0;
    this.lastNamerequired = !!this.lastName && this.lastName.trim().length > 0;
    this.phone = !!this.contactNo && this.contactNo.toString().trim().length > 0;
    this.phoneLengthError = !!this.contactNo && this.contactNo.toString().trim().length < 11;
    this.roletype = !!this.roleId && this.roleId.toString().trim().length > 0;
    this.emailaddress = !!this.email && this.email.trim().length > 0;
    this.passwordtype = !!this.password && this.password.trim().length > 0;
    this.touched = true;

    // You might want to return whether all fields are valid
    return (
      this.firstNamerequired &&
      this.lastNamerequired &&
      this.phone &&
      this.phoneLengthError &&
      this.roletype &&
      this.emailaddress &&
      this.passwordtype
    );
  }


  isSuperAdmin = false;
  isAdmin = false;
  isUser = false;

  ngOnInit() {
    this.role = this.utility.getRole();
    if (this.role) {
      this.role = this.role.toLowerCase();
    }
    console.log("SideBar Role", this.role)
    if (this.role === 'superadmin') {
      this.isSuperAdmin = false;
      this.isAdmin = true;
      this.isUser = true;
    } else if (this.role === 'admin') {
      this.isAdmin = false;
      this.isUser = true;
    } else if (this.role === 'user') {
      this.isUser = true;
    }
  }

}
