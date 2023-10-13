import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'terms-condition', component: TermsConditionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }