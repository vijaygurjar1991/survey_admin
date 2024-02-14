import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// Icons
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { heroChevronRight } from '@ng-icons/heroicons/outline';
import { heroStopCircle } from '@ng-icons/heroicons/outline';
import { heroClipboardDocumentList } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';
import { heroClipboardDocumentCheck } from '@ng-icons/heroicons/outline';
import { heroShieldCheck } from '@ng-icons/heroicons/outline';
import { heroUser } from '@ng-icons/heroicons/outline';
import { heroLockClosed } from '@ng-icons/heroicons/outline';
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroArrowLongRight } from '@ng-icons/heroicons/outline';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { ReportsComponent } from './reports/reports.component';
import { ViewComponent } from './reports/view/view.component';
import { ChartComponent } from './reports/view/chart/chart.component';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { EncryptPipe } from '../pipes/encrypt.pipe';
import { DecryptPipe } from '../pipes/decrypt.pipe';
import { ConvertToUrlPipe } from '../pipes/convert-to-url.pipe';
// Icons

@NgModule({
  declarations: [
    ReportsComponent,
    ViewComponent,
    ChartComponent,
    EncryptPipe,
    DecryptPipe,
    ConvertToUrlPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgIconsModule.withIcons({
      heroUsers,
      heroChevronRight,
      heroStopCircle,
      heroClipboardDocumentList,
      heroQuestionMarkCircle,
      heroClipboardDocumentCheck,
      heroShieldCheck,
      heroUser,
      heroLockClosed,
      heroBell,
      heroArrowLongRight,
      heroBars3,
      heroMagnifyingGlass
    }),
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class DashboardModule { }
