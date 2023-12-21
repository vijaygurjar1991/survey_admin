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
import { GenderPopupComponent } from '../popups/gender-popup/gender-popup.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { QuestionLogic } from 'src/app/models/question-logic';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent implements OnInit {
  @ViewChild('GenderModal', { static: true }) genderModal!: GenderPopupComponent;
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
  questions: any;
  selectedQuestionType: any;
  categoryId: number;
  selectedOption: any;
  isLogicShow: boolean = false
  logicValuesList:any
  logicThensList:any
  logicQuestionList:any

  questionLogic: QuestionLogic = new QuestionLogic();
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
        console.log("_surveyId : ",this.crypto.decryptQueryParam(_surveyId))
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
    this.visibilityService.closeSideBar();
    this.userId = this.utils.getUserId();

    this.getCategoryNames();
    this.hideBreadcrumb();
    this.getNames();
    this.getQuestion();
    this.GetSurveyDetails()
    this.getLogicValues();
    this.getLogicThens();
    this.getLogicQuestionList(0)
  }
  onGenericQuestionClick(type: any): void {
    if (type === "Gender") {
      this.genderModal.show(this.surveyId);
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
  // options: string[] = ['Automotive', 'Beverages - Alcholic',
  //   'Beverages - Alcholic',
  //   'Cosmetic, Personal Care, Toiletries', 'Education', 'Electronics', 'Entertaiment', 'Fashion, Clothing'];
  options: { id: number, name: string }[] = [];
  filteredOptions: Observable<string[]> | undefined;


  _filter(value: string): { id: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue) || option.id.toString().includes(filterValue)
    );
  }

  filterOptions(e: MatAutocompleteSelectedEvent) {
    this.categoryId = e.option.value;
    this.categoryName = e.option.viewValue;
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

  question: any[] = [];

  getQuestion() {
    this.surveyservice.GetQuestionTypes().subscribe({
      next: (resp: any) => {
        console.log('Response:', resp);
        // Map the response to the desired format
        this.question = resp;
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
        this.questions = data[0]?.questions;
      } else {
        this.surveyName = data.surveyName;
        this.categoryName = data.categoryName;
        this.questions = data.questions;
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
      result.forEach((value: any, index: any) => {
        if (value['id'] == this.readCategoryId)
          this.readCategoryName = value['name']
      });
      const models: { id: number; name: string }[] = result.map((value: any) => ({
        id: value['id'],
        name: value['name']
      }));
      this.options = models;
    });
  }

  onQuestionTypeClick(id: any) {
    this.selectedQuestionType = id;
  }
  onCreateQuesClick() {
    let _data = `${this.surveyId}_${this.selectedQuestionType}_add_0`;
    let encryptedText = this.crypto.encryptParam(_data);
    let url = `/survey/manage-question/${encryptedText}`;
    this.router.navigateByUrl(url);
  }
  //onEditQuestionClick
  onEditQuestionClick(questionId: any) {
    console.log("modifyQuestionId", questionId)
    let _data = `${this.surveyId}_${this.selectedQuestionType}_modify_${questionId}`;
    let encryptedText = this.crypto.encryptParam(_data);
    let url = `/survey/manage-question/${encryptedText}`;
    this.router.navigateByUrl(url);
  }
  updateSurvey() {
    const dataToSend = {
      surveyId: this.surveyId,
      surveyName: this.surveyName,
      categoryId: this.categoryId
    };
    console.log("dataToSend", dataToSend)
    this.surveyservice.updateSurvey(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        this.surveyId = response;

        if (this.surveyId) {
          const encryptedId = this.crypto.encryptParam(`${this.surveyId}`);
          const url = `/survey/manage-survey/${encryptedId}`;
          //this.modal.hide();

          this.router.navigateByUrl(url);
          /*if(this.router.url.includes('/manage-survey')){
            location.reload();
          }*/
        }
      },
      error => {
        console.error('Error occurred while sending POST request:', error);
        Swal.fire('', error, 'error');
      }
    );


  }
  toggleLogic(index: number,questionId:any) {
    this.questions[index].isLogicShow = !this.questions[index].isLogicShow;
    this.getLogicQuestionList(questionId)
  }

  getLogicValues() {
    this.surveyservice.getLogicValues().subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("logicValues", response)
      this.logicValuesList = response
    });
  }
  getLogicThens() {
    this.surveyservice.getLogicThens().subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("logicThens", response)
      this.logicThensList = response
    });
  }
  getLogicQuestionList(questionId:any){
    this.logicQuestionList='';
    const dataToSend = {
      surveyId: this.surveyId,
      surveyStatus: questionId
    };
    this.surveyservice.getLogicQuestionList(dataToSend).subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("logicQuestionList", response)
      this.logicQuestionList = response
    });
  }
  createLogic(questionId: any,ifId:any,ifExpected:any,thanId:any,thanExpected:any) {
    this.questionLogic.surveyId=this.surveyId
    this.questionLogic.questionId =questionId
    this.questionLogic.ifId=ifId
    this.questionLogic.ifExpected=ifExpected
    this.questionLogic.thanId=thanId
    this.questionLogic.thanExpected=thanExpected
    
    console.log("dataToSend", this.questionLogic)
    this.surveyservice.createLogic(this.questionLogic).subscribe(
      response => {
        console.log('Response from server:', response);
        Swal.fire('', 'Logic Created Sucessfully.', 'success');
      },
      error => {
        console.error('Error occurred while sending POST request:', error);
        Swal.fire('', error, 'error');
      }
    );


  }
  onSelectChange(event: Event,questionSortValue:any,questionId:number) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    // Use selectedValue as needed
    console.log('Selected value:', selectedValue);
    console.log('Question Sort value:', questionSortValue);

    let queryParams=null;
    if(questionId != 0){
       queryParams = {
        qid: questionId,
        sid: this.surveyId,
        sordId: selectedValue,
        curntId:questionSortValue

      };
    }
    this.surveyservice.changeQuestionPosition(queryParams).subscribe(
      (response:String) => {
        console.log('Update successful:', response);
      },
      (error) => {
        console.error('Error occurred while uploading:', error);
        // Handle error
      }
    );
}

}
