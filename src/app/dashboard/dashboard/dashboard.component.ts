
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: DataService) { }


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


  chart: any = [];
  ngOnInit(): void {
    this.createChart();
    this.showSideBar();
    this.hideBreadcrumb();
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

}