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

@NgModule({
  declarations: [
    AboutComponent,
    PrivacyComponent,
    TermsConditionComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgIconsModule.withIcons({
      heroHome
    }),
    CKEditorModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
  title = 'angular';
}