import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

import { RouterModule } from '@angular/router';
import { ConvertToUrlPipe } from '../pipes/convert-to-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecryptPipe } from '../pipes/decrypt.pipe';
import { EncryptPipe } from '../pipes/encrypt.pipe';
import { CreateSurveyComponent } from '../survey/create-survey/create-survey.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SurveyRoutingModule } from '../survey/survey-routing.module';

@NgModule({
  declarations: [
    ConvertToUrlPipe,
    DecryptPipe,
    EncryptPipe,
    CreateSurveyComponent
  ],
  imports: [
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatAutocompleteModule,
    MatInputModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ModalModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    NgIconsModule.withIcons({
      heroArrowLongRight,
      heroXMark,
      heroMagnifyingGlass,
    }),
    NgxPaginationModule,
  ],
  exports: [
    ConvertToUrlPipe,
    DecryptPipe,
    EncryptPipe,
    CreateSurveyComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
