import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyListingComponent } from './survey-listing/survey-listing.component';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DecimalPipe, NgFor } from '@angular/common';
//import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

// Icons
import { heroChevronLeft } from '@ng-icons/heroicons/outline';
import { heroChevronRight } from '@ng-icons/heroicons/outline';
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';
import { heroCalendar } from '@ng-icons/heroicons/outline';
import { heroLanguage } from '@ng-icons/heroicons/outline';
import { heroMapPin } from '@ng-icons/heroicons/outline';
import { heroPencilSquare } from '@ng-icons/heroicons/outline';
import { heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { heroArrowsPointingOut } from '@ng-icons/heroicons/outline';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { heroPencil } from '@ng-icons/heroicons/outline';
import { heroDocumentDuplicate } from '@ng-icons/heroicons/outline';
import { heroBuildingOffice2 } from '@ng-icons/heroicons/outline';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { heroHome } from '@ng-icons/heroicons/outline';
import { GenderPopupComponent } from './popups/gender-popup/gender-popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgePopupComponent } from './popups/age-popup/age-popup.component';
import { NccsPopupComponent } from './popups/nccs-popup/nccs-popup.component';
import { MonthlyIncomePopupComponent } from './popups/monthly-income-popup/monthly-income-popup.component';
import { HouseholdComponent } from './popups/household/household.component';
import { FamilyMemberPopupComponent } from './popups/family-member-popup/family-member-popup.component';
import { NoOfChildPopupComponent } from './popups/no-of-child-popup/no-of-child-popup.component';
import { WorkingStatusPopupComponent } from './popups/working-status-popup/working-status-popup.component';
import { CityPopupComponent } from './popups/city-popup/city-popup.component';
import { AgeOfChildrenPopupComponent } from './popups/age-of-children-popup/age-of-children-popup.component';
import { OldSecPopupComponent } from './popups/old-sec-popup/old-sec-popup.component';
import { IndustryPopupComponent } from './popups/industry-popup/industry-popup.component';
import { NewFLsmPopupComponent } from './popups/new-f-lsm-popup/new-f-lsm-popup.component';
import { MSlmPopupComponent } from './popups/m-slm-popup/m-slm-popup.component';
import { SLsmPopupComponent } from './popups/s-lsm-popup/s-lsm-popup.component';
import { LanguagePopupComponent } from './popups/language-popup/language-popup.component';
import { GeoLocationPopupComponent } from './popups/geo-location-popup/geo-location-popup.component';
import { MaritalStatusNewPopupComponent } from './popups/marital-status-new-popup/marital-status-new-popup.component';
import { IndustryRespondantPopupComponent } from './popups/industry-respondant-popup/industry-respondant-popup.component';
import { LocalityPopupComponent } from './popups/locality-popup/locality-popup.component';
import { ForeignCountryTravelledPopupComponent } from './popups/foreign-country-travelled-popup/foreign-country-travelled-popup.component';
import { LanguageYouKnowPopupComponent } from './popups/language-you-know-popup/language-you-know-popup.component';
import { HomeAreaTypePopupComponent } from './popups/home-area-type-popup/home-area-type-popup.component';
import { KidsCountPopupComponent } from './popups/kids-count-popup/kids-count-popup.component';
import { OldFLsmPopupComponent } from './popups/old-f-lsm-popup/old-f-lsm-popup.component';
import { StorePopupComponent } from './popups/store-popup/store-popup.component';
import { SelfiePopupComponent } from './popups/selfie-popup/selfie-popup.component';
import { AccomodationTypePopupComponent } from './popups/accomodation-type-popup/accomodation-type-popup.component';
import { HomeAccessoriesPopupComponent } from './popups/home-accessories-popup/home-accessories-popup.component';
import { NamePopupComponent } from './popups/name-popup/name-popup.component';
import { EmailAddressPopupComponent } from './popups/email-address-popup/email-address-popup.component';
import { PinCodePopupComponent } from './popups/pin-code-popup/pin-code-popup.component';
import { AudioGenderDetectionPopupComponent } from './popups/audio-gender-detection-popup/audio-gender-detection-popup.component';
import { StatePopupComponent } from './popups/state-popup/state-popup.component';
import { IndustryHouseholdPopupComponent } from './popups/industry-household-popup/industry-household-popup.component';
import { SecBnSlPopupComponent } from './popups/sec-bn-sl-popup/sec-bn-sl-popup.component';
import { SharedModule } from '../shared/shared.module';
import { FlsmPopupComponent } from './popups/flsm-popup/flsm-popup.component';
import { SecLsmPopupComponent } from './popups/sec-lsm-popup/sec-lsm-popup.component';
import { heroShoppingBag } from '@ng-icons/heroicons/outline';
import { OccupationPopupComponent } from './popups/occupation-popup/occupation-popup.component';
//import { ProfileIdPopupComponent } from './popups/profile-id-popup/profile-id-popup.component';
// Icons
import { heroMinusCircle } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    CreateSurveyComponent,
    EditSurveyComponent,
    SurveyListingComponent,
    GenderPopupComponent,
    AgePopupComponent,
    NccsPopupComponent,
    MonthlyIncomePopupComponent,
    HouseholdComponent,
    FamilyMemberPopupComponent,
    NoOfChildPopupComponent,
    WorkingStatusPopupComponent,
    CityPopupComponent,
    AgeOfChildrenPopupComponent,
    OldSecPopupComponent,
    IndustryPopupComponent,
    NewFLsmPopupComponent,
    MSlmPopupComponent,
    SLsmPopupComponent,
    LanguagePopupComponent,
    GeoLocationPopupComponent,
    MaritalStatusNewPopupComponent,
    IndustryRespondantPopupComponent,
    LocalityPopupComponent,
    ForeignCountryTravelledPopupComponent,
    LanguageYouKnowPopupComponent,
    HomeAreaTypePopupComponent,
    KidsCountPopupComponent,
    OldFLsmPopupComponent,
    StorePopupComponent,
    SelfiePopupComponent,
    AccomodationTypePopupComponent,
    HomeAccessoriesPopupComponent,
    NamePopupComponent,
    EmailAddressPopupComponent,
    PinCodePopupComponent,
    AudioGenderDetectionPopupComponent,
    StatePopupComponent,
    IndustryHouseholdPopupComponent,
    SecBnSlPopupComponent,
    FlsmPopupComponent,
    SecLsmPopupComponent,
    OccupationPopupComponent,
    //ProfileIdPopupComponent
  ],
  imports: [
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    SurveyRoutingModule,
    DragDropModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    TagInputModule,
    NgxDropzoneModule,
    ModalModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    //DecimalPipe, NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule,
    NgIconsModule.withIcons({
      heroQuestionMarkCircle,
      heroCalendar,
      heroLanguage,
      heroMapPin,
      heroPencilSquare,
      heroEllipsisVertical,
      heroArrowsPointingOut,
      heroTrash,
      heroPencil,
      heroDocumentDuplicate,
      heroBuildingOffice2,
      heroArrowUpTray,
      heroPlusCircle,
      heroArrowRight,
      heroHome,
      heroChevronLeft,
      heroChevronRight,
      heroShoppingBag,
      heroMinusCircle
    }),
    NgxPaginationModule,
    SharedModule
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class SurveyModule {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
