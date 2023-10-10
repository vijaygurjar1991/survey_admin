import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';

const routes: Routes = [
  { path: 'create-survey', component: CreateSurveyComponent},
  { path: 'edit-survey', component: EditSurveyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
