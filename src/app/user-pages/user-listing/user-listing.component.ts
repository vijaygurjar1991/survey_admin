import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {
  UserData: any;
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef) { }
  files: File[] = [];
  role: any;
  id: number = 0;
  firstName: any;
  lastName: any;
  email: any;
  roleId: number = 0;
  image: any;

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



}
