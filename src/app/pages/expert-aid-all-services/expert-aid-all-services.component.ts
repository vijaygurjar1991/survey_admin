import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expert-aid-all-services',
  templateUrl: './expert-aid-all-services.component.html',
  styleUrls: ['./expert-aid-all-services.component.css']
})
export class ExpertAidAllServicesComponent {


  UserData: any;
  baseUrl = '';
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef, private utility: UtilsService) {
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

}
