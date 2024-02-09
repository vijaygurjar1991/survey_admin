import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {
  UserData: any;
  image: any;
  baseUrl = '';
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef) {
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


  roles: any[] = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'User' }
  ];

  ngOnInit(): void {
    this.role = localStorage.getItem("role")
    this.getAllUser()
  }

  userId: any;


  getAllUser() {
    this.userId = localStorage.getItem("userId");
    this.themeService.GetAllUser(this.userId).subscribe((data: any) => {
      this.UserData = data;
      console.log("data", data)

      this.cdr.detectChanges();
    });
  }
  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  }


}
