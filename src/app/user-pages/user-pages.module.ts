import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserListingComponent } from './user-listing/user-listing.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { heroHome } from '@ng-icons/heroicons/outline';
import { heroPencil } from '@ng-icons/heroicons/outline';
import { AddUserComponent } from './add-user/add-user.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    LoginComponent,
    UserListingComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    CarouselModule,
    FormsModule,
    NgxDropzoneModule,
    NgIconsModule.withIcons({     
      heroEllipsisVertical,
      heroHome,
      heroPencil
     
    }),
  ]
})
export class UserPagesModule { }
