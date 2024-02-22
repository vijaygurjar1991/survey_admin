import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { SurveyService } from 'src/app/service/survey.service';
import { User } from 'src/app/models/user';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent {
  @ViewChild('CreateSurveyModal', { static: true }) CreateSurveyModal!: ModalDirective;

  role: any;
  userId: any;
  categories: any;

  isSuperAdmin = false;
  isAdmin = false;
  isUser = false;
  isClient = false;



  constructor(public themeService: DataService,
    private auth: AuthService, private util: UtilsService) {


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
  ngOnInit() {
    this.role = this.util.getRole();
    if (this.role) {
      this.role = this.role.toLowerCase();
    }
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

  isSubMenu1Visible = false;
  isSubMenu2Visible = false;
  isSubMenu3Visible = false;
  isSubMenu4Visible = false

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
      case 4:
        this.isSubMenu4Visible = !this.isSubMenu4Visible;
        break;
      default:
        break;
    }
  }

  onAddNewSurveyClick() {
    this.CreateSurveyModal.show();
  }



}
