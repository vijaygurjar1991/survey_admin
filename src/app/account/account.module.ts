import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroHome } from '@ng-icons/heroicons/outline';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    EditorModule,
    NgIconsModule.withIcons({
      heroHome
    }),
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AccountModule { }