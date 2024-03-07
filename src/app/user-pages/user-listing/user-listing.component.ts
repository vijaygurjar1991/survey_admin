import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
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
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef, private utility: UtilsService) {
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

    //search
    this.themeService.getSearchQuery().subscribe((searchQuery) => {
      // Use the search query to filter the list
      this.applyFilter(searchQuery);
      console.log("applyfilter", searchQuery)
    });
  }

  filteredSurveyData: any[] = [];
  searchQuery: any
  applyFilter(searchQuery: string): void {
    console.log('Search query:', searchQuery); // Log the search query value

    if (!searchQuery) {
      // If searchQuery is undefined or empty, display the entire list
      this.filteredSurveyData = [];
    } else {
      // Filter the list based on the search query
      this.filteredSurveyData = this.UserData.filter((item: { name: string; userName: string; email: string; }) =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.userName && item.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      console.log("filterdata email", this.filteredSurveyData)
    }
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
