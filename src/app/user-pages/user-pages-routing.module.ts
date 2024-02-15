import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent, data: { layout: 'auth' } },
  { path: 'all-users', component: UserListingComponent, data: { title: 'All User' } },
  { path: 'add-user', component: AddUserComponent, data: { title: 'Add New User' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
