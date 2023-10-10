import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSurveyComponent } from './create-survey/create-survey.component';

const routes: Routes = [
  { path: 'create-survey', component: CreateSurveyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
