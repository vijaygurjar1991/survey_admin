import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

import { RouterModule } from '@angular/router';
import { ConvertToUrlPipe } from '../pipes/convert-to-url.pipe';
import { FormsModule } from '@angular/forms';
import { DecryptPipe } from '../pipes/decrypt.pipe';
import { EncryptPipe } from '../pipes/encrypt.pipe';

@NgModule({
  declarations: [
    ConvertToUrlPipe,
    DecryptPipe,
    EncryptPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIconsModule.withIcons({
      heroArrowLongRight,
      heroXMark,
      heroMagnifyingGlass,
    })
  ],
  exports: [
    ConvertToUrlPipe,
    DecryptPipe,
    EncryptPipe
  ]

})
export class SharedModule { }
