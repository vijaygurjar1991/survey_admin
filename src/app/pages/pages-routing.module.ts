import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { ExpertAidComponent } from './expert-aid/expert-aid.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'privacy-policy', component: PrivacyComponent, data: { title: 'Privacy' } },
  { path: 'terms-condition', component: TermsConditionComponent, data: { title: 'Terms&Condition' } },
  { path: 'expert-aid', component: ExpertAidComponent, data: { title: 'Expert Aid' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }