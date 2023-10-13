import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', loadChildren: () => import ('./survey/survey.module').then(m => m.SurveyModule) },
  { path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
