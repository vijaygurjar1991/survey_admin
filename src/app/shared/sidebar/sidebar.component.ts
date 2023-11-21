import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent {
  private subscription: Subscription;
  role: any;
  userId: any;
  categories: any;

  isSuperAdmin = false;
  isAdmin = false;
  isUser = false;
  isClient = false;


  constructor(private modalService: NgbModal, public themeService: DataService, private auth: AuthService, private surveyservice: SurveyService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    /*auth.userData.subscribe((user: User) => {
      debugger
      //if (user) {
      let role = localStorage.getItem("role");
      switch (role) {
        case 'client': {
          this.isClient = true;
          break;
        }
        case 'superadmin': {
          this.isSuperAdmin = true;
          break;
        }
        case 'admin': {
          this.isAdmin = true;
          break;
        }
        default: {
          this.isUser = true;
          break;
        }
      }
      this.role = user.role;
      this.userId = user.userId;
      //}
    });*/
  }

  getNames() {
    this.surveyservice.GetCategories(this.userId).subscribe(response => {
      var result = Object.keys(response).map(e => response[e]);
      var models: string[] = [];
      result.forEach((vcalue: any, index: any) => {
        var model = vcalue['name'];
        models.push(model);
      });
      this.options = models;
    })
  }
  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.getNames();
    if (this.userId) {
      this.getNames();
    }
    this.role = this.role.toLowerCase()
    console.log("SideBar Role", this.role)
    if (this.role == 'client')
      this.isClient = true;
    else if (this.role == 'superadmin')
      this.isSuperAdmin = true
    else if (this.role == 'admin')
      this.isAdmin = true
    else if (this.role == 'user')
      this.isUser = true

  }

  logOut() {
    this.auth.logout();
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  isSubMenu1Visible = false;
  isSubMenu2Visible = false;
  isSubMenu3Visible = false;

  toggleSubMenu(subMenuNumber: number) {
    switch (subMenuNumber) {
      case 1:
        this.isSubMenu1Visible = !this.isSubMenu1Visible;
        break;
      case 2:
        this.isSubMenu2Visible = !this.isSubMenu2Visible;
        break;
      case 3:
        this.isSubMenu3Visible = !this.isSubMenu3Visible;
        break;
      default:
        break;
    }
  }

  searchControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

}
