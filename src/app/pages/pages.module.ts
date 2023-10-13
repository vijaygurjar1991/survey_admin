import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { EditorModule } from '@tinymce/tinymce-angular';
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
    EditorModule,
    NgxDropzoneModule,
    NgIconsModule.withIcons({
      heroHome
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule { }