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

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],

})
export class EditSurveyComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  citiesCtrl = new FormControl('');
  filteredCities: Observable<string[]>;
  cities: string[] = ['Others'];
  allcities: string[] = [];

  surveyId: any;
  questionTypeId: any;
  question: Question = new Question();

  optionsArr1: any[] = [];
  optionsArr2: any[] = [];


  constructor(public themeService: DataService, private router: Router,
    private route: ActivatedRoute, private surveyservice: SurveyService,
    private crypto: CryptoService) {
    this.filteredCities = this.citiesCtrl.valueChanges.pipe(
      startWith(null),
      map((cities: string | null) => (cities ? this._filter(cities) : this.allcities.slice())),
    );

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
  @ViewChild('citiesInput')
  citiesInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our cities
    if (value) {
      this.cities.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.citiesCtrl.setValue(null);
  }

  remove(cities: string): void {
    const index = this.cities.indexOf(cities);

    if (index >= 0) {
      this.cities.splice(index, 1);

      this.announcer.announce(`Removed ${cities}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cities.push(event.option.viewValue);
    this.citiesInput.nativeElement.value = '';
    this.citiesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allcities.filter(cities => cities.toLowerCase().includes(filterValue));
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

    // this.question.options.push(newOption);
  }

  onSave() {

    let options: Option[] = this.optionsArr1.concat(this.optionsArr2);

    this.question.options = options;
    console.log(this.question);
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
      randomize: false,
      exclude: false,
      ids: []
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
