import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      heroArrowLongRight
    })
  ],

})
export class SharedModule { }
