import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
// Icons
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';

import { heroHome } from '@ng-icons/heroicons/outline';

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
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { heroCommandLine } from '@ng-icons/heroicons/outline';
import { heroShoppingBag } from '@ng-icons/heroicons/outline';
// Icons

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb/breadcrumb.component';
import { LoginComponent } from './user-pages/login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { CaptchaComponent } from './shared/captcha/captcha.component';
import { CreateSurveyPopupComponent } from './survey/popups/create-survey-popup/create-survey-popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignUpComponent } from './user-pages/sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoginComponent,
    CaptchaComponent,
    CreateSurveyPopupComponent,
    SignUpComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CarouselModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ModalModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    MatSelectModule,
    NgIconsModule.withIcons({
      heroHome,
      heroCommandLine,
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
      heroXMark,
      heroMagnifyingGlass,
      heroTrash,
      heroShoppingBag
    }),
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxPaginationModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    provideNgIconsConfig({
      size: '1.8em',
    }),
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
