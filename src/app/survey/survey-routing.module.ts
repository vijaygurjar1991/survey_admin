import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyListingComponent } from './survey-listing/survey-listing.component';

const routes: Routes = [
  { path: 'survey/manage-survey/:param1/:param2', component: CreateSurveyComponent, data: { triggerToggle: true } },
  { path: 'manage-survey/:id/:name', component: CreateSurveyComponent, data: { triggerToggle: true } },
  // { path: 'edit-survey', component: EditSurveyComponent, data: { triggerToggle: true } },
  { path: 'all-survey', component: SurveyListingComponent, data: { title: 'View Survey' } },
  { path: 'user/:id/:name', component: CreateSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
