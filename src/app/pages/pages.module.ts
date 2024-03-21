import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { heroHome } from '@ng-icons/heroicons/outline';
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { ExpertAidComponent } from './expert-aid/expert-aid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroPencil } from '@ng-icons/heroicons/outline';
import { ExpertAidListComponent } from './expert-aid-list/expert-aid-list.component';
import { ExpertAidAllServicesComponent } from './expert-aid-all-services/expert-aid-all-services.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    AboutComponent,
    PrivacyComponent,
    TermsConditionComponent,
    ExpertAidComponent,
    ExpertAidListComponent,
    ExpertAidAllServicesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    NgIconsModule.withIcons({
      heroHome,
      heroXMark,
      heroPencil,
      heroInformationCircle
    }),
    CKEditorModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
  title = 'angular';
}