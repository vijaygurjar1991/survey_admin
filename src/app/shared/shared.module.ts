import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

//icons//
import { NgIconsModule } from '@ng-icons/core';
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { heroBars2 } from '@ng-icons/heroicons/outline';
import { heroHome } from '@ng-icons/heroicons/outline';
import { heroHeart } from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgIconsModule.withIcons({ heroBell, heroUserCircle, heroBars2, heroHeart }),
  ],

})
export class SharedModule { }
