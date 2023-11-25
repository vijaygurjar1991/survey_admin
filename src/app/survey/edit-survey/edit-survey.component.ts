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
  constructor(public themeService: DataService, private router: Router,
    private route: ActivatedRoute, private surveyservice: SurveyService) {
    this.filteredCities = this.citiesCtrl.valueChanges.pipe(
      startWith(null),
      map((cities: string | null) => (cities ? this._filter(cities) : this.allcities.slice())),
    );


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const shouldTriggerToggle = this.route.snapshot.data['triggerToggle'];
        if (shouldTriggerToggle) {
          // Trigger the toggle action when the user lands on this page
          this.themeService.toggle();
        }
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
  ngOnInit(): void {
    this.getQuestion();
    this.CreateGeneralQuestion();
  }


  // tags: string[] = [];
  // tagInput: string = '';

  // onKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     this.addTag();
  //   }
  // }

  // addTag() {
  //   if (this.tagInput.trim() !== '' && !this.tags.includes(this.tagInput)) {
  //     this.tags.push(this.tagInput);
  //     this.tagInput = '';
  //   }
  // }

  // removeTag(tag: string) {
  //   this.tags = this.tags.filter((t) => t !== tag);
  // }

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
  question: { type: string, subType: string, image: string }[] = [];

  getQuestion() {
    this.surveyservice.GetQuestionTypes().subscribe({
      next: (resp: responseDTO[]) => {

        // Map the response to the desired format
        this.question = resp.map(item => ({ type: item.type, subType: item.subType, image: item.image }));
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }

  creategeneralquestion: {
    surveyTypeId: number,
    questionTypeName: string,
    surveyTypeName: string,
    piping: string,
    video: string,
    image: string,
    options: { id: number, option: string, image: string, keyword: string }[]
  }[] = [];

  CreateGeneralQuestion() {
    this.surveyservice.CreateGeneralQuestion().subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        this.creategeneralquestion = resp.map(item => ({
          surveyTypeId: item.surveyTypeId,
          questionTypeName: item.questionTypeName,
          surveyTypeName: item.surveyTypeName,
          piping: item.piping,
          video: item.video,
          image: item.image,
          options: item.options.map((option: { id: number, option: string, image: string, keyword: string }) => ({
            id: option.id,
            option: option.option,
            image: option.image,
            keyword: option.keyword
          }))

        }));
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }
}
