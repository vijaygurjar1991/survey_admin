import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserPagesRoutingModule } from './user-pages-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserListingComponent } from './user-listing/user-listing.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { heroHome } from '@ng-icons/heroicons/outline';
import { heroPencil } from '@ng-icons/heroicons/outline';
import { AddUserComponent } from './add-user/add-user.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileByIdComponent } from './profile-by-id/profile-by-id.component';
import { ProfileIdPopupComponent } from '../survey/popups/profile-id-popup/profile-id-popup.component';



@NgModule({
  declarations: [
    //  LoginComponent,
    UserListingComponent,
    AddUserComponent,
    ProfileByIdComponent,
    ProfileIdPopupComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    CarouselModule,
    FormsModule,
    NgxDropzoneModule,
    ModalModule,
    NgIconsModule.withIcons({
      heroEllipsisVertical,
      heroHome,
      heroPencil

    }),
  ]
})
export class UserPagesModule { }
