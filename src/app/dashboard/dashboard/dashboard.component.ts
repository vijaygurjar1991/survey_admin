
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { UtilsService } from 'src/app/service/utils.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('CreateSurveyModal', { static: true }) CreateSurveyModal!: ModalDirective;
  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: DataService,
    public surveyservice: SurveyService, private auth: AuthService, private utility: UtilsService) {
    visibilityService.articleVisible.next(true);

    this.auth.userData$.subscribe((user: User) => {
      this.userId = user.userId;
    });


  }

  userId: any;
  role: any;
  id: number = 0;
  firstName: any;
  lastName: any;

  hideHeader() {
    console.log("hideHeader function called");
    this.visibilityService.toggleHeaderVisibility(false);

  }
  showHeader() {
    console.log("showHeader function called");
    this.visibilityService.toggleHeaderVisibility(true);

  }
  hideSideBar() {
    this.visibilityService.toggleNavbarVisibility(false);
  }
  showSideBar() {
    this.visibilityService.toggleNavbarVisibility(true);
  }
  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }
  ShowBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(true);
  }
  // ngOnInit() {
  //   this.hideSideBar();
  // }
  // isSubMenu1Visible = false;
  // isSubMenu2Visible = false;
  // isSubMenu3Visible = false;

  // toggleSubMenu(subMenuNumber: number) {
  //   switch (subMenuNumber) {
  //     case 1:
  //       this.isSubMenu1Visible = !this.isSubMenu1Visible;
  //       break;
  //     case 2:
  //       this.isSubMenu2Visible = !this.isSubMenu2Visible;
  //       break;
  //     case 3:
  //       this.isSubMenu3Visible = !this.isSubMenu3Visible;
  //       break;
  //     default:
  //       break;
  //   }
  // }


  getMyAccount() {
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("Info", data)
      if (data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName
        this.id = data.id
      }
    });
  }

  chart: any = [];
  ngOnInit(): void {
    this.showHeader();
    this.createChart();
    this.showSideBar();
    this.hideBreadcrumb();
    this.role = localStorage.getItem("role");
    this.getMyAccount();
    this.getSurveyList();
  }
  createChart() {
    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
        labels: ['2023-04-06', '2023-05-06', '2023-06-06', '2023-07-06', '2023-08-06', '2023-09-06', '2023-10-06'],
        datasets: [
          {
            label: "online",
            data: ['300', '350', '280', '550', '450', '700', '680'],
            borderColor: '#00e396',
            backgroundColor: 'rgba(0, 227, 150, 0.2)',
            fill: {
              target: 'origin',
              above: 'rgba(0, 227, 150, 0.2)',
              below: 'rgba(0, 227, 150, 0)'
            },
            tension: 0.3
          },
          {
            label: "offline",
            data: ['100', '300', '520', '300', '320', '400', '350'],
            borderColor: '#008ffb',
            backgroundColor: 'rgba(0, 143, 251, 0.2)',
            fill: {
              target: 'origin',
              above: 'rgba(0, 143, 251, 0.2)',
              below: 'rgba(0, 143, 251, 0)'
            },
            tension: 0.3
          }
        ]
      },
      options: {
        aspectRatio: 3
      }
    });
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  surveylist: {
    name: string,
    status: string | number,
    categoryName: string,
    userName: string,
    createdDate: any,
    surveyId: number
  }[] = [];

  getSurveyList() {
    this.surveyservice.GetRecentSurveyList().subscribe({
      next: (resp: responseDTO[]) => {
        console.log('surveylist:', resp);
        this.surveylist = resp.map(item => ({
          name: item.name,
          status: item.status.toString(),
          categoryName: item.categoryName,
          userName: item.userName,
          createdDate: new Date(item.createdDate),
          surveyId: item.surveyId
        }));
      },
      error: (err) => console.log("An Error occur while fetching survey list", err)
    });
  }

  // getSurveyReport() {
  //   this.surveyservice.getReportSurvey(this.surveyId).subscribe({
  //     next: (resp: any) => {
  //       this.utility.showSuccess('Updated.');
  //       window.location.reload();
  //     },
  //     error: (err: any) => {
  //       this.utility.showError('error');
  //     }
  //   });
  // }
  onAddNewSurveyClick() {
    this.CreateSurveyModal.show();
  }


}