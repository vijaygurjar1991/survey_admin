import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    CarouselModule
  ]
})
export class UserPagesModule { }
