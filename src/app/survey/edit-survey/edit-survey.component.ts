import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataService } from 'src/app/service/data.service'; // Import your DataService
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SurveyService } from 'src/app/service/survey.service';
import { responseDTO } from 'src/app/types/responseDTO';
import { CryptoService } from 'src/app/service/crypto.service';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],

})
export class EditSurveyComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  surveyId: any;
  questionTypeId: any;
  question: Question = new Question();

  optionsArr1: any[] = [];
  optionsArr2: any[] = [];
  filteredOptions: any[] = [];
  allOptions: any[] = [];


  constructor(public themeService: DataService, private router: Router,
    private route: ActivatedRoute, private surveyservice: SurveyService,
    private crypto: CryptoService) {
    this.route.paramMap.subscribe(params => {
      let _queryData = params.get('param1');
      if (_queryData) {
        let _queryDecodedData = this.crypto.decryptQueryParam(_queryData);
        let _data = _queryDecodedData.split('_');
        this.surveyId = _data[0];
        this.questionTypeId = _data[1];
      }
    });
  }


  ngOnInit() {
    this.themeService.closeSideBar();
    this.getQuestionTypes();
    this.intializeDefaultValue();
  }

  onQuestionTypeClick(id: any) {
    this.questionTypeId = id;
  }

  files: File[] = [];

  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  selected(event: MatAutocompleteSelectedEvent, groupIndex: number) {
    let option = event.option.value;
    let optionValue = option.option;

    this.groups[groupIndex].options.push(option);


    if (option) {
      const indexToRemove = this.filteredOptions.findIndex(option => option.option === optionValue);

      if (indexToRemove !== -1) {
        this.filteredOptions.splice(indexToRemove, 1);
      } else {
        console.log(`Item with option '${optionValue}' not found in filtered Options.`);
      }
    }

    let groupDetail = this.groups[groupIndex];

    let indexToModify = this.allOptions.findIndex((option: any) => option.option === optionValue);
    if (indexToModify !== -1) {
      this.allOptions[indexToModify].group = groupDetail.id;
      this.allOptions[indexToModify].isRandomize = groupDetail.isRandomize;
      this.allOptions[indexToModify].isExcluded = groupDetail.isExcluded;
    } else {
      console.log(`Item with option '${optionValue}' not found in all Options.`);
    }

  }

  Remove(data: any, groupIndex: number) {
    let optionValue = data.option;
    const indexToRemove = this.groups[groupIndex].options.findIndex((option: any) => option.option === optionValue);

    if (indexToRemove !== -1) {
      this.groups[groupIndex].options.splice(indexToRemove, 1);
    } else {
      console.log(`Item with option '${optionValue}' not found.`);
    }

    this.filteredOptions.push(data);

    let indexToModify = this.allOptions.findIndex((option: any) => option.option === optionValue);
    if (indexToModify !== -1) {
      this.allOptions[indexToModify].group = 0;
      this.allOptions[indexToModify].isRandomize = false;
      this.allOptions[indexToModify].isExcluded = false;
    } else {
      console.log(`Item with option '${optionValue}' not found in all Options.`);
    }

  }

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  userId: any
  questionTypes: any[] = [];

  getQuestionTypes() {
    this.surveyservice.GetQuestionTypes().subscribe({
      next: (resp: any) => {
        this.questionTypes = resp;
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }

  intializeDefaultValue() {
    this.question.questionTypeId = parseInt(this.questionTypeId);
    this.question.surveyTypeId = parseInt(this.surveyId);
    this.question.question = 'Please enter your age in completed years';
    this.question.createdDate = this.getCurrentDateTime();
    this.question.modifiedDate = this.getCurrentDateTime();

    let newOption1 = new Option();
    newOption1.createdDate = this.getCurrentDateTime();
    newOption1.modifiedDate = this.getCurrentDateTime();
    newOption1.option = 'testing 1';
    this.optionsArr1.push(newOption1);

    let newOption2 = new Option();
    newOption2.createdDate = this.getCurrentDateTime();
    newOption2.modifiedDate = this.getCurrentDateTime();
    newOption2.option = 'testing 2';
    this.optionsArr1.push(newOption2);

    let newOption3 = new Option();
    newOption3.createdDate = this.getCurrentDateTime();
    newOption3.modifiedDate = this.getCurrentDateTime();
    newOption3.option = 'testing 3';
    this.optionsArr1.push(newOption3);

    let newOption4 = new Option();
    newOption4.createdDate = this.getCurrentDateTime();
    newOption4.modifiedDate = this.getCurrentDateTime();
    newOption4.option = 'Other';
    this.optionsArr2.push(newOption4);

    this.filteredOptions.push(...this.optionsArr1, ...this.optionsArr2);
    this.allOptions.push(...this.optionsArr1, ...this.optionsArr2);

  }

  hanldeAddOptionClick(type: string | null = null) {
    let newOption = new Option();

    newOption.createdDate = this.getCurrentDateTime();
    newOption.modifiedDate = this.getCurrentDateTime();


    if (type == 'other') {
      newOption.option = "Other";
    }
    else if (type == 'noneOfAbove') {
      newOption.option = "None of above";
    }
    else if (type == 'dontKnow') {
      newOption.option = "Don't know /Can't say";
    }
    else {
      newOption.option = "";
    }

    if (type != null) {
      this.optionsArr2 = [];
      this.optionsArr2.push(newOption);
    } else {
      this.optionsArr1.push(newOption);
    }

    this.filteredOptions = [];
    this.filteredOptions.push(...this.optionsArr1, ...this.optionsArr2);


    this.allOptions = [];
    this.allOptions.push(...this.optionsArr1, ...this.optionsArr2);
    // this.question.options.push(newOption);
  }

  onSave() {

    if (this.groups.length > 0) {
      this.question.isGrouping = true;
    }

    this.question.options = this.allOptions;

    this.surveyservice.CreateGeneralQuestion(this.question).subscribe({
      next: (resp: any) => {
        Swal.fire('', 'Question Generated Sucessfully.', 'success');

        let url = `/survey/manage-survey/${this.crypto.encryptParam(this.surveyId)}`;

        this.router.navigateByUrl(url);
      },
      error: (err: any) => {
        Swal.fire('', err.error, 'error');
      }
    });

    console.log(this.question);
  }

  onGroupValueChange(type: string, value: boolean, groupId: number) {

    const matchingOptions = this.allOptions.filter(option => option.group === groupId);

    if (type == 'randomize') {
      if (matchingOptions.length > 0) {
        matchingOptions.forEach(option => {
          option.isRandomize = value;
        });
      }
    }

    if (type == 'excluded') {
      if (matchingOptions.length > 0) {
        matchingOptions.forEach(option => {
          option.isExcluded = value;
        });
      }
    }
  }

  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }

  onDropOption(e: CdkDragDrop<string[]>) {
    moveItemInArray(this.optionsArr1, e.previousIndex, e.currentIndex);
  }

  onDeleteOption(type: string, index = 0) {
    if (type == 'optionArr1') {
      this.optionsArr1.splice(index, 1);
    } else {
      this.optionsArr2 = [];
    }
  }

  groups: any[] = [];
  onCreateGroup() {
    let id = 1;
    if (this.groups.length > 0) {
      let lastIndex = this.groups.length - 1;
      let lastItem = this.groups[lastIndex];
      id = ((lastItem?.id || 1) + 1);
    }
    let newGroup = {
      id: id,
      isRandomize: false,
      isExcluded: false,
      options: []
    }

    this.groups.push(newGroup);

  }

  onDeleteGroup(index: number) {
    this.groups.splice(index, 1);
  }


  // creategeneralquestion: {
  //   surveyTypeId: number,
  //   questionTypeName: string,
  //   surveyTypeName: string,
  //   piping: string,
  //   video: string,
  //   image: string,
  //   options: { id: number, option: string, image: string, keyword: string }[]
  // }[] = [];

  // CreateGeneralQuestion() {
  //   this.surveyservice.CreateGeneralQuestion().subscribe({
  //     next: (resp: responseDTO[]) => {
  //       console.log('Response:', resp);
  //       this.creategeneralquestion = resp.map(item => ({
  //         surveyTypeId: item.surveyTypeId,
  //         questionTypeName: item.questionTypeName,
  //         surveyTypeName: item.surveyTypeName,
  //         piping: item.piping,
  //         video: item.video,
  //         image: item.image,
  //         options: item.options.map((option: { id: number, option: string, image: string, keyword: string }) => ({
  //           id: option.id,
  //           option: option.option,
  //           image: option.image,
  //           keyword: option.keyword
  //         }))

  //       }));
  //     },
  //     error: (err) => console.log("An Error occurred while fetching question types", err)
  //   });
  // }
}
