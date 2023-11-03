import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/service/data.service'; // Import your DataService
import { ModalDirective } from 'ngx-bootstrap/modal';


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
  @ViewChild('SLsmModal', { static: true }) languageModal!: ModalDirective;
  @ViewChild('GeoLocationModal', { static: true }) geolocationModal!: ModalDirective;
  @ViewChild('MartialStatusModal', { static: true }) martialStatusModal!: ModalDirective;
  @ViewChild('IndustryRespondantModal', { static: true }) industryrespondantModal!: ModalDirective;
  @ViewChild('LocalityModal', { static: true }) localityModal!: ModalDirective;
  @ViewChild('ForeignCountryTravelledModal', { static: true }) foreigncountrytravelledModal!: ModalDirective;
  @ViewChild('LanguageYouKnowModel', { static: true }) languageyouknowModal!: ModalDirective;
  @ViewChild('HomeAreaTypeModal', { static: true }) homeareatypeModal!: ModalDirective;
  @ViewChild('KidsCountModal', { static: true }) kidscountModal!: ModalDirective;
  @ViewChild('OldFLsmModal', { static: true }) oldflsmModal!: ModalDirective;
  @ViewChild('StoreModal', { static: true }) storeModal!: ModalDirective;
  @ViewChild('SelfieModal', { static: true }) selfieModal!: ModalDirective;
  @ViewChild('AccomodationTypeModal', { static: true }) accomodationtypeModal!: ModalDirective;






  constructor(
    private visibilityService: DataService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private renderer: Renderer2,
    private el: ElementRef,
    public themeService: DataService
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

  }

  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  ShowBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(true);
  }

  ngOnInit(): void {
    this.hideBreadcrumb();
  }
  onGenericQuestionClick(type: any): void {
    if (type === "gender") {
      this.genderModal.show();
    } else if (type === "age") {
      this.ageModal.show();
    } else if (type === "nccs") {
      this.nccsModal.show();
    } else if (type === "monthlyincome") {
      this.monthlyincomeModal.show();
    } else if (type === "household") {
      this.householdModal.show();
    } else if (type === "familymember") {
      this.familymenberModal.show();
    } else if (type === "numberofchild") {
      this.numberofchildModal.show();
    } else if (type === "workingstatus") {
      this.workingstatusModal.show();
    } else if (type === "city") {
      this.cityModal.show();
    } else if (type === "ageofchildren") {
      this.ageofchildrenModal.show();
    } else if (type === "oldsec") {
      this.oldsecModal.show();
    } else if (type === "industry") {
      this.industryModal.show();
    } else if (type === "newflsm") {
      this.newflsmModal.show();
    } else if (type === "mslm") {
      this.mslmModal.show();
    } else if (type === "slsm") {
      this.slsmModal.show();
    } else if (type === "language") {
      this.languageModal.show();
    } else if (type === "geolocation") {
      this.geolocationModal.show();
    } else if (type === "martialstatus") {
      this.martialStatusModal.show();
    } else if (type === "industryrespondant") {
      this.industryrespondantModal.show();
    } else if (type === "locality") {
      this.localityModal.show();
    } else if (type === "foreigncountrytravelled") {
      this.foreigncountrytravelledModal.show();
    } else if (type === "languageyouknow") {
      this.languageyouknowModal.show();
    } else if (type === "homeareatype") {
      this.homeareatypeModal.show();
    } else if (type === "kidscount") {
      this.kidscountModal.show();
    } else if (type === "oldflsm") {
      this.oldflsmModal.show();
    } else if (type === "store") {
      this.storeModal.show();
    } else if (type === "selfie") {
      this.selfieModal.show();
    } else if (type === "accomodationtype") {
      this.accomodationtypeModal.show();
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


}
