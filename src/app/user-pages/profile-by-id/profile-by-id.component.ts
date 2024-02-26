import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileIdPopupComponent } from 'src/app/survey/popups/profile-id-popup/profile-id-popup.component';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-profile-by-id',
  templateUrl: './profile-by-id.component.html',
  styleUrls: ['./profile-by-id.component.css']
})
export class ProfileByIdComponent {

  @ViewChild('ProfileId', { static: true }) ProfileId!: ProfileIdPopupComponent;

  UserData: any[] = [];
  image: any;
  baseUrl = '';

  constructor(public themeService: DataService, private cdr: ChangeDetectorRef, private utility: UtilsService, private modalService: NgbModal, private surveyservice: SurveyService,) {
    this.baseUrl = environment.baseURL;
  }
  files: File[] = [];
  role: any;
  id: number = 0;
  firstName: any;
  lastName: any;
  email: any;
  contactNo: number;
  createdDate: any;
  roleId: number = 0;
  centerId: number = this.utility.getCenterId();


  roles: any[] = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'User' }
  ];

  ngOnInit(): void {
    this.role = this.utility.getRole()
    this.getAllUser()
  }

  userId: any;


  getAllUser() {
    this.userId = localStorage.getItem("userId");

    this.userId = localStorage.getItem("userId");
    this.themeService.GetAllUserProfileById(this.userId, this.centerId).subscribe((data: any) => {
      this.UserData = data;

      console.log("qwerty", this.firstName)
      console.log("data", data)

      this.cdr.detectChanges();
    });
  }
  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  }

  onAddNewSurveyClick() {
    this.ProfileId.show();
  }

  userName: any
  lastname: any
  contact: any
  userroledata: any
  usercreateddate: any
  userstatus: any

  getUserDetails(userId: any): void {
    console.log("userId", userId)
    const filteredUser = this.UserData.find((user: any) => user.id === userId);
    if (filteredUser) {
      this.firstName = filteredUser.firstName
      this.lastname = filteredUser.lastName
      this.email = filteredUser.email;
      this.contact = filteredUser.contactNo;
      this.userroledata = filteredUser.role;
      this.usercreateddate = filteredUser.createdDate;
      this.id = userId;
      this.userstatus = filteredUser.status


      // You can access other properties in a similar manner

      console.log("User Name:", this.userName);
      console.log("User Name:", this.lastname);
      console.log("User Email:", this.email);
      console.log("status", this.userstatus)
      // Output other details as needed
      this.isChecked = this.userstatus === 'ACT';
      console.log(this.isChecked)

    } else {
      console.log("User not found with ID:", userId);
    }

    console.log("Filtered User:", filteredUser);
  }

  isChecked: boolean = false


  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
  }



  updateProfile(Id: any) {
    let status = this.isChecked ? "ACT" : "DEL";

    console.log(this.firstName);
    const dataToSend = {
      id: Id,
      firstName: this.firstName,
      lastname: this.lastname,
      contact: this.contact,
      createdDate: this.createdDate,
      email: this.email,
      role: this.role,
      status: status
    };

    this.surveyservice.updateProfile(dataToSend).subscribe({
      next: (resp: any) => {
        this.utility.showSuccess('Updated.');
        window.location.reload();
      },
      error: (err: any) => {
        this.utility.showError('error');
      }
    });

  }



}
