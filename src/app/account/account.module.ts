import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroHome } from '@ng-icons/heroicons/outline';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';

import { FormsModule } from '@angular/forms';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,

    NgIconsModule.withIcons({
      heroHome
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AccountModule { }