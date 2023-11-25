import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

import { RouterModule } from '@angular/router';
import { ConvertToUrlPipe } from '../pipes/convert-to-url.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConvertToUrlPipe
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
  ]

})
export class SharedModule { }
