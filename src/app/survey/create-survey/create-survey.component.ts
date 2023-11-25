import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/service/data.service'; // Import your DataService
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { CryptoService } from 'src/app/service/crypto.service';
import { UtilsService } from 'src/app/service/utils.service';
import { isArray } from 'chart.js/dist/helpers/helpers.core';


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent implements OnInit {
  @ViewChild('GenderModal', { static: true }) genderModal!: ModalDirective;
  @ViewChild('AgeModal', { static: true }) ageModal!: ModalDirective;
  @ViewChild('NccsModal', { static: true }) nccsModal!: ModalDirective;
  @ViewChild('MonthlyIncomeModal', { static: true }) monthlyincomeModal!: ModalDirective;
  @ViewChild('HouseholdModal', { static: true }) householdModal!: ModalDirective;
  @ViewChild('FamilyMemberModal', { static: true }) familymenberModal!: ModalDirective;
  @ViewChild('NumberOfChildModal', { static: true }) numberofchildModal!: ModalDirective;
  @ViewChild('WorkingStatusModal', { static: true }) workingstatusModal!: ModalDirective;
  @ViewChild('CityModal', { static: true }) cityModal!: ModalDirective;
  @ViewChild('AgeOfChildrenModal', { static: true }) ageofchildrenModal!: ModalDirective;
  @ViewChild('OldSecModal', { static: true }) oldsecModal!: ModalDirective;
  @ViewChild('IndustryModal', { static: true }) industryModal!: ModalDirective;
  @ViewChild('NewFLsmModal', { static: true }) newflsmModal!: ModalDirective;
  @ViewChild('MSlmModal', { static: true }) mslmModal!: ModalDirective;
  @ViewChild('SLsmModal', { static: true }) slsmModal!: ModalDirective;
  @ViewChild('LanguageModal', { static: true }) languageModal!: ModalDirective;
  @ViewChild('GeoLocationModal', { static: true }) geolocationModal!: ModalDirective;
  @ViewChild('MartialStatusModal', { static: true }) martialStatusModal!: ModalDirective;
  @ViewChild('IndustryRespondantModal', { static: true }) industryrespondantModal!: ModalDirective;
  @ViewChild('IndustryHouseholdModal', { static: true }) industryhouseholdModal!: ModalDirective;
  @ViewChild('LocalityModal', { static: true }) localityModal!: ModalDirective;
  @ViewChild('ForeignCountryTravelledModal', { static: true }) foreigncountrytravelledModal!: ModalDirective;
  @ViewChild('LanguageYouKnowModel', { static: true }) languageyouknowModal!: ModalDirective;
  @ViewChild('HomeAreaTypeModal', { static: true }) homeareatypeModal!: ModalDirective;
  @ViewChild('KidsCountModal', { static: true }) kidscountModal!: ModalDirective;
  @ViewChild('OldFLsmModal', { static: true }) oldflsmModal!: ModalDirective;
  @ViewChild('SecBnSlNpl', { static: true }) secbnslnplModal!: ModalDirective;
  @ViewChild('StoreModal', { static: true }) storeModal!: ModalDirective;
  @ViewChild('SelfieModal', { static: true }) selfieModal!: ModalDirective;
  @ViewChild('AccomodationTypeModal', { static: true }) accomodationtypeModal!: ModalDirective;
  @ViewChild('HomeAccessoriesModal', { static: true }) homeaccessoriesModal!: ModalDirective;
  @ViewChild('NameModal', { static: true }) nameModal!: ModalDirective;
  @ViewChild('EmailAddressModal', { static: true }) emailaddressModal!: ModalDirective;
  @ViewChild('PinCodeModal', { static: true }) pincodeModal!: ModalDirective;
  @ViewChild('AudioGenderDetectionModal', { static: true }) audiogenderdetectionModal!: ModalDirective;
  @ViewChild('StateModal', { static: true }) stateModal!: ModalDirective;


  role: string;
  userId: number;
  name: string;
  type: string[] = [];
  subType: string[] = [];
  readSurveyName: any
  readCategoryId: any
  readCategoryName: any
  categoryList: any;
  names: { name: string, image: string }[] = [];


  constructor(
    private visibilityService: DataService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private renderer: Renderer2,
    private el: ElementRef,
    public themeService: DataService,
    private surveyservice: SurveyService,
    private crypto: CryptoService,
    private utils: UtilsService
  ) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const shouldTriggerToggle = this.route.snapshot.data['triggerToggle'];
        if (shouldTriggerToggle) {
          // Trigger the toggle action when the user lands on this page
          this.dataService.toggle();
        }
      }
    });

    this.route.paramMap.subscribe(params => {
      let _surveyId = params.get('param1');
      if (_surveyId) {
        this.surveyId = parseInt(this.crypto.decryptQueryParam(_surveyId));
      }
    });

  }

  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  ShowBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(true);
  }

  surveyId = 0;

  ngOnInit() {
    this.userId = this.utils.getUserId();

   // this.getCategoryNames();
    this.hideBreadcrumb();
    this.getNames();
    this.getQuestion();
    this.GetSurveyDetails()
  }
  onGenericQuestionClick(type: any): void {
    if (type === "Gender") {
      this.genderModal.show();
    } else if (type === "Age") {
      this.ageModal.show();
    } else if (type === "NCCS") {
      this.nccsModal.show();
    } else if (type === "Monthly Income") {
      this.monthlyincomeModal.show();
    } else if (type === "Household Income") {
      this.householdModal.show();
    } else if (type === "Family Member") {
      this.familymenberModal.show();
    } else if (type === "No. of Child") {
      this.numberofchildModal.show();
    } else if (type === "Working Status") {
      this.workingstatusModal.show();
    } else if (type === "City") {
      this.cityModal.show();
    } else if (type === "Age of Childern") {
      this.ageofchildrenModal.show();
    } else if (type === "Old SEC") {
      this.oldsecModal.show();
    } else if (type === "Industry") {
      this.industryModal.show();
    } else if (type === "New F-LSM") {
      this.newflsmModal.show();
    } else if (type === "M-SLM") {
      this.mslmModal.show();
    } else if (type === "S-SLM") {
      this.slsmModal.show();
    } else if (type === "Language") {
      this.languageModal.show();
    } else if (type === "Geo Location") {
      this.geolocationModal.show();
    } else if (type === "Marital Status New") {
      this.martialStatusModal.show();
    } else if (type === "Industry Respondant") {
      this.industryrespondantModal.show();
    } else if (type === "Industry Household") {
      this.industryhouseholdModal.show();
    } else if (type === "Locality") {
      this.localityModal.show();
    } else if (type === "Foreign Country Travelled") {
      this.foreigncountrytravelledModal.show();
    } else if (type === "Language You Know") {
      this.languageyouknowModal.show();
    } else if (type === "Home Area Type") {
      this.homeareatypeModal.show();
    } else if (type === "Kids + Count") {
      this.kidscountModal.show();
    } else if (type === "Old F-LSM") {
      this.oldflsmModal.show();
    } else if (type === "Sec (BN/SL/NPL)") {
      this.secbnslnplModal.show();
    } else if (type === "Store") {
      this.storeModal.show();
    } else if (type === "Selfie") {
      this.selfieModal.show();
    } else if (type === "Accomodation Type") {
      this.accomodationtypeModal.show();
    } else if (type === "Home Accessories") {
      this.homeaccessoriesModal.show();
    } else if (type === "Name") {
      this.nameModal.show();
    } else if (type === "Email Address") {
      this.emailaddressModal.show();
    } else if (type === "Pincode") {
      this.pincodeModal.show();
    } else if (type === "Audio Gender Detection") {
      this.audiogenderdetectionModal.show();
    } else if (type === "State") {
      this.stateModal.show();
    }
  }
  openFullscreen(content: any) {
    this.modalService.open(content, { fullscreen: true, windowClass: 'right-aligned-modal' });
  }

  open(Editsurvey: any) {
    this.modalService.open(Editsurvey, { size: 'lg', centered: true });
  }

  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    // Add more items as needed
  ];

  // cloneLi() {
  //   const liToClone = this.el.nativeElement.querySelector('li.cdkDrag');

  //   if (liToClone) {
  //     const clonedLi = liToClone.cloneNode(true);
  //     this.renderer.appendChild(liToClone.parentElement, clonedLi);
  //   }
  // }

  onItemDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  onDragStarted(): void {
    // You can add code here if needed
  }

  searchControl = new FormControl();
  options: string[] = ['Automotive', 'Beverages - Alcholic',
    'Beverages - Alcholic',
    'Cosmetic, Personal Care, Toiletries', 'Education', 'Electronics', 'Entertaiment', 'Fashion, Clothing'];
  filteredOptions: Observable<string[]> | undefined;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  onDragEnded(): void {
    // You can add code here if needed
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  opensidecontent() {
    const modalRef = this.modalService.open(this.opensidecontent, { /* modal options */ });
  }

  getNames() {
    this.surveyservice.GetGenericQuestion().subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.names = resp.map(item => ({ name: item.name, image: item.image }));
      },
      error: (err) => console.log("An Error occur while fetching categories", err)
    });
  }

  question: { type: string, subType: string, image: string }[] = [];

  getQuestion() {
    this.surveyservice.GetQuestionTypes().subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        // Map the response to the desired format
        this.question = resp.map(item => ({ type: item.type, subType: item.subType, image: item.image }));
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }

  surveyName: any;
  categoryName: any

  GetSurveyDetails() {
    this.surveyservice.GetSurveyById(this.surveyId).subscribe((data: any) => {

      if (Array.isArray(data)) {
        this.surveyName = data[0]?.surveyName;
        this.categoryName = data[0]?.categoryName;
      } else {
        this.surveyName = data.surveyName;
        this.categoryName = data.categoryName;
      }
      console.log("data", data)

    });
  }


  getCategoryNames() {
    this.surveyservice.GetCategories().subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("categoryList", response)
      this.categoryList = response
      console.log("update", result);
      var models: { id: number, name: string }[] = []; // Assuming 'id' is a number
      result.forEach((value: any, index: any) => {
        if (value['id'] == this.readCategoryId)
          this.readCategoryName = value['name']
      });

    });
  }


  // onDrop(event: CdkDragDrop<string[]>): void {
  //   moveItemInArray(this.names, event.previousIndex, event.currentIndex);
  // }



}
