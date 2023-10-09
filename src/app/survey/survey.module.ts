import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { CreateSurveyComponent } from './create-survey/create-survey.component';


@NgModule({
  declarations: [
    CreateSurveyComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
