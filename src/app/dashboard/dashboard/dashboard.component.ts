
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
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CryptoService } from 'src/app/service/crypto.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  baseUrl = '';
  @ViewChild('CreateSurveyModal', { static: true }) CreateSurveyModal!: ModalDirective;
  constructor(private visibilityService: DataService, private modalService: NgbModal, public themeService: DataService,
    public surveyservice: SurveyService, private auth: AuthService, private utility: UtilsService, private crypto: CryptoService, private router: Router) {
    this.baseUrl = environment.baseURL;
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
  modal: any;

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
    this.getCountries();
    this.getNames();
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
  onAddNewSurvey(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
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


  //create survey popup
  categoryName: any = "";
  surveyName: any;
  categoryId: number;
  newsurveyId: number;
  selectedOption: any;
  searchControl = new FormControl();
  options: { id: number, name: string }[] = [];
  country: { id: string, name: string, images: string }[] = [];
  filteredOptions: Observable<{ id: number, name: string }[]> | undefined;
  selectedCategory: { id: number, name: string } | null = null;
  selectedCountry: { id: string, name: string, images: string } | null = null;
  selectedCountryId: string | null = null;



  // selectedCountry: string = "IN";
  surveyNameCheck: boolean = true
  countryNameCheck: boolean = true
  categoryNameCheck: boolean = true
  otherCategoryCheck: boolean = true
  isValidSurvey: boolean = false


  show() {
    this.modal.show();
    this.getNames();
    this.getCountries();
  }

  close() {
    this.modal.hide();
  }

  getNames() {
    this.surveyservice.GetCategories().subscribe(response => {

      const result = Object.keys(response).map((key) => response[key]);

      const models: { id: number; name: string }[] = result.map((value: any) => ({
        id: value['id'],
        name: value['name']
      }));

      this.options = models;
    });
  }

  getCountries() {
    this.surveyservice.getCountries().subscribe(response => {

      const result = Object.keys(response).map((key) => response[key]);
      console.log(result)
      const countries: { id: string; name: string; images: string }[] = result.map((value: any) => ({
        id: value['countryId'],
        name: value['name'],
        images: value['images']

      }));

      this.country = countries;
      console.log("country", this.country)
    });

  }



  _filter(value: string): { id: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue) || option.id.toString().includes(filterValue)
    );
  }

  filterOptions(e: MatAutocompleteSelectedEvent) {
    this.categoryId = e.option.value;
    this.selectedOption = e.option.viewValue;

  }
  validateSurvey() {
    this.surveyNameCheck = !!this.surveyName && this.surveyName.length >= 3;
    this.categoryNameCheck = !!this.categoryId && this.categoryId !== 0;
    this.otherCategoryCheck = this.categoryId !== 10 || (!!this.categoryName && this.categoryName.length >= 3);
    this.selectedCountryId = this.selectedCountry ? this.selectedCountry.id : null;
    this.countryNameCheck = !!this.selectedCountryId;

    this.isValidSurvey = this.surveyNameCheck && this.categoryNameCheck && this.otherCategoryCheck && this.countryNameCheck;
  }

  createSurvey() {

    this.validateSurvey()
    if (this.isValidSurvey) {
      const dataToSend = {
        name: this.surveyName,
        categoryId: this.categoryId,
        otherCategory: this.categoryName,
        countryId: this.selectedCountryId
      };

      console.log("dataToSend", dataToSend);

      this.surveyservice.createSurvey(dataToSend).subscribe(
        response => {
          console.log('Response from server:', response);
          if (this.removeQuotes(response) == 'AlreadyExits') {
            this.utility.showError("This Survey Already Created")
            return
          }
          const result = this.convertStringToNumber(this.removeQuotes(response));
          console.log("result", result)
          if (result !== null) {
            this.newsurveyId = result
            console.log(this.newsurveyId)
            const encryptedId = this.crypto.encryptParam(`${this.newsurveyId}`);
            const url = `/survey/manage-survey/${encryptedId}`;
            this.modal.hide();
            this.router.navigateByUrl(url);
            if (this.router.url.includes('/manage-survey')) {
              location.reload();
              // setTimeout(() => {
              //   window.location.reload();
              // }, 100); // Adjust the delay as needed
            }
          }
        },
        error => {
          console.error('Error occurred while sending POST request:', error);
          this.utility.showError(error);
        }
      );
    }
  }
  convertStringToNumber(str: string): number | null {
    const converted = +str; // Using the unary plus operator to attempt conversion
    return isNaN(converted) ? null : converted;
  }
  removeQuotes(str: string): string {
    return str.replace(/"/g, ''); // Replaces all occurrences of double quotes with an empty string
  }


}