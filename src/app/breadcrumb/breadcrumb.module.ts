import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbRoutingModule } from './breadcrumb-routing.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

//icons
import { NgIconsModule } from '@ng-icons/core';
import { heroHome } from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BreadcrumbRoutingModule,
    NgIconsModule.withIcons({
      heroHome
    }),
  ]
})
export class BreadcrumbModule { }
