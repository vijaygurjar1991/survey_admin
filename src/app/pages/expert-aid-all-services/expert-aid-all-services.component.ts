import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-expert-aid-all-services',
  templateUrl: './expert-aid-all-services.component.html',
  styleUrls: ['./expert-aid-all-services.component.css']
})
export class ExpertAidAllServicesComponent {


  UserData: any;
  baseUrl = '';
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef, private utility: UtilsService, private surveyservice: SurveyService) {
    this.baseUrl = environment.baseURL;
  }
  files: File[] = [];
  role: any;
  id: number = 0;
  name: any;
  projectType: any;
  email: any;
  mobile: number;
  comments: any;
  roleId: number = 0;
  expertAidServices: any[];
  centerId: number = this.utility.getCenterId();


  roles: any[] = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'User' }
  ];




  ngOnInit(): void {
    this.role = this.utility.getRole()
    console.log("Center Id :", this.centerId)
    this.getAllUser()
  }

  userId: any;


  getAllUser() {
    this.userId = this.utility.getUserId();
    // this.userId = localStorage.getItem("userId");
    this.themeService.getAllExpertAidList(this.userId).subscribe((data: any) => {
      this.UserData = data;
      console.log("Rishabh", data);
      //this.cdr.detectChanges();
    });
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  }

  userName: any
  userprojectType: any
  contact: any
  userroledata: any
  createdDate: any;
  userstatus: any


  // Assuming UserData is defined somewhere with appropriate typing

  getUserDetails(userId: any): void {
    console.log("userId", userId)
    const filteredUser = this.UserData.find((user: any) => user.id === userId);
    if (filteredUser) {
      this.userName = filteredUser.name;
      this.userprojectType = filteredUser.projectType;
      this.email = filteredUser.email;
      this.contact = filteredUser.mobile;
      this.createdDate = filteredUser.startDate;
      this.userstatus = filteredUser.status;

      console.log("User Name:", this.userName);
      console.log("User Email:", this.email);
      console.log("Status:", this.userstatus);
    } else {
      console.log("User not found with ID:", userId);
    }
  }

  isChecked: boolean = false;

  // onCheckboxChange(event: any) {
  //   this.isChecked = event.target.checked;
  // }

  // updateProfile(Id: any) {
  //   let status = this.isChecked ? "ACT" : "DEL";

  //   console.log(this.userName);
  //   const dataToSend = {
  //     id: Id,
  //     name: this.userName,
  //     projectType: this.userprojectType,
  //     email: this.email,
  //     mobile: this.contact,
  //     startDate: this.createdDate,
  //     status: status,
  //     comments: "", // You may need to add logic for comments
  //     centerId: 0, // You may need to add logic for centerId
  //     centerName: "", // You may need to add logic for centerName
  //     expertAidServices: [] // You may need to add logic for expertAidServices
  //   };

  //   this.surveyservice.updateExpertAidProfile(dataToSend).subscribe({
  //     next: (resp: any) => {
  //       this.utility.showSuccess('Updated.');
  //       // window.location.reload();
  //     },
  //     error: (err: any) => {
  //       this.utility.showError('error');
  //     }
  //   });
  // }
  updateStatus(id: any, status: any) {

    const filteredUser = this.UserData.find((user: any) => user.id === id);


    console.log("Id : ", id)
    console.log("status : ", status)
    // if (status == 'ACT')
    //   filteredUser.status = 'ACT'
    // else
    //   filteredUser.status = 'DEL'
    // const dateString = filteredUser.startDate;
    // const date = new Date(dateString);
    // const formattedDate = date.toLocaleDateString('en-US', {
    //   month: '2-digit', // 'MM'
    //   day: '2-digit',   // 'dd'
    //   year: 'numeric'   // 'YYYY'
    // });
    // filteredUser.startDate = formattedDate
    const dataToSend = {
      id: filteredUser.id,
      centerId: filteredUser.centerId,
      status: status === 'ACT' ? 'ACT' : 'DEL'
    };
    console.log(filteredUser)

    this.surveyservice.updateExpertAidProfile(dataToSend).subscribe({
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
