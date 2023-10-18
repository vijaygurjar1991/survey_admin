import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

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
import { heroXMark } from '@ng-icons/heroicons/outline';
// Icons

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    EditorModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
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
      heroXMark
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    provideNgIconsConfig({
      size: '1em',
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
