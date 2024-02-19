import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject, EventEmitter, Output } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],

})
export class EditSurveyComponent {

  @Output() onSaveEvent = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  surveyId: any;
  questionTypeId: any;
  question: Question = new Question();
  mode: any
  questionId: any

  optionsArr1: any[] = [];
  optionsArr2: any[] = [];
  filteredOptions: any[] = [];
  allOptions: any[] = [];
  groups: any[] = [];
  questionImage: any
  filesImage: File[] = [];
  filesVideo: File[] = [];
  logicQuestionList: any
  pipeQuestionList: any
  isLogicShow: boolean = false
  logicValuesList: any
  optionLogicValuesList: any
  optionListByQuestionId: any
  selectedOptions: any[] = [];
  getquestionTypeName: any
  baseUrl = '';
  constructor(public themeService: DataService, private router: Router,
    private route: ActivatedRoute, private surveyservice: SurveyService, private modalService: NgbModal,
    private crypto: CryptoService, private utility: UtilsService) {
    this.baseUrl = environment.baseURL;
    this.route.paramMap.subscribe(params => {
      let _queryData = params.get('param1');
      if (_queryData) {
        let _queryDecodedData = this.crypto.decryptQueryParam(_queryData);
        let _data = _queryDecodedData.split('_');
        this.surveyId = _data[0];
        this.questionTypeId = _data[1];
        this.mode = _data[2];
        this.questionId = _data[3]

        console.log("surveyId", this.surveyId)
        console.log("questionTypeId", this.questionTypeId)
        console.log("mode", this.mode)
        console.log("questionId", this.questionId)
        if (this.questionId > 1)
          this.isLogicShow = true
        if (this.mode == 'modify') {
          this.getQuestionDetails();
          this.getLogicQuestionList(this.questionId);
          this.getLogicValues()
          this.getOptionsLogicValues()
        } else {
          this.getquestionTypeName = _data[4]
        }
      }
    });
  }
  groupedOptions: { [key: number]: { options: Option[], isRandomize: boolean, isExcluded: boolean } } = {};
  getQuestionDetails() {
    this.surveyservice.getQuestionDetailsById(this.questionId).subscribe((data: any) => {
      console.log("data", data)
      console.log("questionTypeId", data.questionTypeId)
      this.questionTypeId = data.questionTypeId
      this.surveyId = data.surveyTypeId
      this.question.questionTypeId = parseInt(data.questionTypeId);
      this.question.surveyTypeId = parseInt(data.surveyTypeId);
      this.question.question = data.question;
      this.question.createdDate = data.createdDate;
      this.question.modifiedDate = this.getCurrentDateTime();
      this.question.sort = data.sort
      this.question.questionTypeName = data.questionTypeName

      data.options.forEach((opt: any) => {

        let newOption = new Option();
        newOption.id = opt.id;
        newOption.option = opt.option;
        newOption.image = opt.image;
        newOption.createdDate = opt.createdDate;
        newOption.modifiedDate = opt.modifiedDate;
        newOption.keyword = opt.keyword;
        newOption.status = opt.status;
        newOption.isRandomize = opt.isRandomize;
        newOption.isExcluded = opt.isExcluded;
        newOption.group = opt.group;
        newOption.sort = opt.sort;

        this.optionsArr1.push(newOption); // Push the new Option object to optionsArr1

        console.log("see", this.optionsArr1)

        if (opt.group > 0) {
          if (!this.groupedOptions[opt.group]) {
            this.groupedOptions[opt.group] = {
              options: [], // Initialize array for the options
              isRandomize: opt.isRandomize || false, // Set isRandomize for the group
              isExcluded: opt.isExcluded || false, // Set isExcluded for the group
            };
          }
          this.groupedOptions[opt.group].options.push(newOption);
        }

      });

      //console.log('Grouped Options:', this.groupedOptions);
      //console.log('length:', Object.keys(this.groupedOptions).length);
      this.filteredOptions.push(...this.optionsArr1, ...this.optionsArr2);
      this.allOptions.push(...this.optionsArr1, ...this.optionsArr2);
      this.getGroupValue();
    });




  }
  getGroupValue() {
    if (this.groupedOptions && Object.keys(this.groupedOptions).length > 0) {
      for (const groupKey in this.groupedOptions) {
        if (this.groupedOptions.hasOwnProperty(groupKey)) {
          const groupOptions = this.groupedOptions[groupKey];
          const isRandomize = groupOptions.isRandomize || false;
          const isExcluded = groupOptions.isExcluded || false;

          let newGroup = {
            id: +groupKey, // Convert groupKey to number if needed
            isRandomize: isRandomize,
            isExcluded: isExcluded,
            options: groupOptions.options // Assign options for this group
          };

          this.groups.push(newGroup); // Push newGroup to groups array
        }
      }
      console.log('Groups:', this.groups);
    } else {
      console.log('groupedOptions is empty or does not have keys.');
    }
  }

  ngOnInit() {

    this.themeService.closeSideBar();
    this.getQuestionTypes();
    if (this.mode != 'modify') {
      this.intializeDefaultValue();
      this.hanldeAddOptionClick();
      this.hanldeAddOptionClick();
      this.hanldeAddOptionClick();
    }


  }

  onQuestionTypeClick(id: any) {
    this.questionTypeId = id;
  }

  files: File[] = [];

  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  categoryId: number;

  selected(event: MatAutocompleteSelectedEvent, groupIndex: number) {

    this.categoryId = event.option.value;
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
        console.log("this.questionTypes", this.questionTypes)
        // alert(this.questionTypeId)
        this.questionTypeNameGet = this.getTypeById(this.questionTypeId);
        // alert(this.questionTypeNameGet)
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }
  questionTypeNameGet: any
  getTypeById(targetId: number): string | null {
    console.log("Searching for ID:", targetId);
    const questionType = this.questionTypes.find(item => item.id === targetId);
    if (questionType) {
      console.log("Found type:", questionType.type);
      return questionType.type;
    } else {
      console.log("Type not found for ID:", targetId);
      return null;
    }
  }

  intializeDefaultValue() {
    console.log("Inside IntializeDefaultValue")
    this.question.questionTypeId = parseInt(this.questionTypeId);
    this.question.surveyTypeId = parseInt(this.surveyId);
    this.question.question = '';
    this.question.createdDate = this.getCurrentDateTime();
    this.question.modifiedDate = this.getCurrentDateTime();
    this.question.questionTypeName = this.getquestionTypeName

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

  questions: any[] = [];
  categoryNameChecks: boolean[] = [];
  initializeCategoryNameChecks() {
    this.categoryNameChecks = new Array(this.groups.length).fill(false);
  }
  validateSurvey(): boolean {
    this.initializeCategoryNameChecks();
    // Validate each field individually
    this.questionadded = !!this.question && !!this.question.question && this.question.question.trim().length > 0;
    this.qusstionaddednext = !!this.question && !!this.question.questionTypeName && this.question.questionTypeName.trim().length > 0;


    // Check if categoryNameCheck validation is needed (only if a group exists)
    const atLeastOneGroupExists = this.groups.length > 0;
    if (atLeastOneGroupExists) {
      for (let i = 0; i < this.groups.length; i++) {
        const group = this.groups[i];
        if (!group.options || group.options.length === 0) {
          this.categoryNameChecks[i] = false;
          continue; // Skip to the next iteration if group.options is undefined or empty
        }
        let hasBlankOption = false;
        for (const option of group.options) {
          if (!option.option || option.option.trim() === '') {
            hasBlankOption = true;
            break; // Exit the loop once a blank or undefined value is found
          }
        }
        this.categoryNameChecks[i] = !hasBlankOption; // If no blank or undefined value found, set it to true
      }
    } else {
      this.categoryNameCheck = true; // Skip validation if no groups exist
    }
    // if (atLeastOneGroupExists) {
    //   this.categoryNameCheck = !!this.categoryId && this.categoryId !== 0;
    // } else {
    //   this.categoryNameCheck = true; // Skip validation if no groups exist
    // }

    // Update the validity state of the survey
    this.isValidSurvey = this.questionadded && this.qusstionaddednext && this.categoryNameCheck;

    return this.isValidSurvey; // Return the validation result
  }

  onSave() {
    // Validate the survey
    const isSurveyValid = this.validateSurvey();

    if (!isSurveyValid) {
      // Show error message if fields are empty
      this.utility.showError('Please fill all required fields.');
      return;
    }

    // Prepare data to send
    const dataToSend = {
      name: this.question.question,
      categoryId: this.categoryId,
      countryId: this.question.questionTypeName
    };

    // Update the question properties if necessary
    if (this.groups.length > 0) {
      this.question.isGrouping = true;
    }
    if (this.questionId > 0) {
      this.question.id = this.questionId;
    }
    this.question.image = this.questionImage;
    this.question.options = this.allOptions;
    console.log("checking", this.question.options)

    // Send the request based on whether it's an update or creation
    if (parseFloat(this.questionId) > 0) {
      // Update existing question
      this.surveyservice.updateGeneralQuestion(this.question).subscribe({
        next: (resp: any) => {
          this.categoryNameCheck = false;
          this.utility.showSuccess('Question Updated Successfully.');
          let url = `/survey/manage-survey/${this.crypto.encryptParam(this.surveyId)}`;
          this.router.navigateByUrl(url);
        },
        error: (err: any) => {
          // Swal.fire('', err.error, 'error');
          this.utility.showError('error');
        }
      });
    } else {
      // Create new question
      this.surveyservice.CreateGeneralQuestion(this.question).subscribe({
        next: (resp: any) => {
          this.categoryNameCheck = false;
          this.utility.showSuccess('Question Generated Successfully.');
          let url = `/survey/manage-survey/${this.crypto.encryptParam(this.surveyId)}`;
          this.router.navigateByUrl(url);
          this.onSaveEvent.emit();
        },
        error: (err: any) => {
          this.utility.showError('error');
        }
      });
    }

    console.log(this.question); // Log the question
  }




  // validateSurvey() function







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
    this.categoryNameCheck = false;
  }

  onSelectImage(event: any) {
    const file = event.addedFiles && event.addedFiles.length > 0 ? event.addedFiles[0] : null;

    if (file) {
      this.filesImage.push(file); // Store the selected file
      this.uploadImage(file); // Trigger upload after selecting the file
    }
  }
  onRemoveImage(event: any) { // Use 'any' as the event type
    console.log(event);
    this.filesImage.splice(this.files.indexOf(event), 1);
  }
  uploadImage(file: File): void {

    let queryParams = null;
    if (this.questionId != 0) {
      queryParams = {
        qid: this.questionId
      };
    }

    this.surveyservice.uploadImageQuestion(file, queryParams).subscribe(
      (response: String) => {
        console.log('Upload successful:', response);
        this.questionImage = response
        // Handle response from the image upload
        // You may want to retrieve the URL or any other relevant information from the response
      },
      (error) => {
        console.error('Error occurred while uploading:', error);
        // Handle error
      }
    );
  }

  onSelectVideo(event: any) {
    const file = event.addedFiles && event.addedFiles.length > 0 ? event.addedFiles[0] : null;

    if (file) {
      this.filesVideo.push(file); // Store the selected file
      this.uploadVideo(file); // Trigger upload after selecting the file
    }
  }
  onRemoveVideo(event: any) { // Use 'any' as the event type
    console.log(event);
    this.filesVideo.splice(this.files.indexOf(event), 1);
  }
  uploadVideo(file: File): void {

    let queryParams = null;
    if (this.questionId != 0) {
      queryParams = {
        qid: this.questionId
      };
    }
    this.surveyservice.uploadVideoQuestion(file, queryParams).subscribe(
      (response: String) => {
        console.log('Upload successful:', response);
        this.questionImage = response
      },
      (error) => {
        console.error('Error occurred while uploading:', error);
        // Handle error
      }
    );
  }
  getLogicQuestionList(questionId: any) {
    this.logicQuestionList = '';
    const dataToSend = {
      surveyId: this.surveyId,
      surveyStatus: questionId
    };
    this.surveyservice.getLogicQuestionList(dataToSend).subscribe((response: responseDTO) => {
      console.log("logicQuestionList", response);
      console.log("Question Sort Value", this.question.sort);
      this.pipeQuestionList = response
      this.logicQuestionList = response.filter((item: Question) => item.sort < this.question.sort);
      if (this.logicQuestionList.length > 0) {
        this.getOptionsByQuestionId(this.logicQuestionList[0].id);
      }
      console.log("Filtered logicQuestionList", this.logicQuestionList);
    });
  }
  getLogicValues() {
    this.surveyservice.getLogicValues().subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("logicValues", response)
      this.logicValuesList = response
    });
  }
  getOptionsLogicValues() {
    this.surveyservice.getOptionsLogicValues().subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);
      console.log("optionLogicValues", response)
      this.optionLogicValuesList = response
    });
  }
  getOptionsByQuestionId(selectedQuestion: any) {
    this.selectedOptions = [];
    this.optionListByQuestionId = ''
    console.log("selectedQuestion", selectedQuestion);
    const selectedValue = selectedQuestion;
    let queryParams = {
      qid: selectedValue
    }
    this.surveyservice.getOptionsByQuestionId(queryParams).subscribe((response: { [x: string]: any; }) => {
      var result = Object.keys(response).map(e => response[e]);

      this.optionListByQuestionId = response
      console.log("optionListByQuestionId", this.optionListByQuestionId)
      this.optionListByQuestionId = JSON.parse(this.optionListByQuestionId)
    });
  }
  addOption(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    // Check if the entered value is in the available options
    const matchingOption = this.optionListByQuestionId.find((option: Option) => option.option === value);

    if (matchingOption && !this.selectedOptions.includes(matchingOption)) {
      this.selectedOptions.push(matchingOption);
    }

    if (input) {
      input.value = '';
    }
  }
  removeOption(option: any): void {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }

  selectedOption(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.value;
    if (!this.selectedOptions.includes(selectedOption)) {
      this.selectedOptions.push(selectedOption);
    }
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
  onLogicSave(): void {

  }


  //validation

  questionadded: boolean = true
  qusstionaddednext: boolean = true
  answer: boolean = true
  addquestion: string;
  categoryNameCheck: boolean = true
  questionTypeName: { questionTypeName: string } = { questionTypeName: '' };
  option = {
    option: '' // Initialize option.option with an empty string
  };
  isValidSurvey: boolean = false




  // validateSurvey() {
  //   this.questionadded = !!this.question && !!this.question.question && this.question.question.length >= 0;
  //   this.qusstionaddednext = !!this.question && !!this.question.questionTypeName && this.question.questionTypeName.trim().length > 0;

  //   if (!this.option.option.trim()) {
  //     // Display error message or perform any other action
  //     console.log("Option is required.");
  //   }
  // }

  // validateSurvey(): boolean {
  //   // Validate each field individually
  //   this.questionadded = !!this.question && !!this.question.question && this.question.question.trim().length > 0;
  //   this.categoryNameCheck = !!this.categoryId && this.categoryId !== 0;
  //   this.qusstionaddednext = !!this.question && !!this.question.questionTypeName && this.question.questionTypeName.trim().length > 0;

  //   const questionadded = !!this.question && !!this.question.question && this.question.question.trim().length > 0;
  //   const categoryNameCheck = !!this.categoryId && this.categoryId !== 0;
  //   const qusstionaddednext = !!this.question && !!this.question.questionTypeName && this.question.questionTypeName.trim().length > 0;

  //   // Update the validity state of the survey
  //   this.isValidSurvey = questionadded && categoryNameCheck && qusstionaddednext;

  //   return this.isValidSurvey; // Return the validation result
  // }

  onQuestionTypeClickchoice(ques: any) {
    // this.question.question = `${ques.type}`;
    this.question.questionTypeName = `${ques.type}`;
    this.questionTypeId = ques.id;
  }

  onSelectChange(event: MatSelectChange, questionSortValue: any, questionId: any) {

    //const target = event.target as HTMLSelectElement;
    const selectedValue = event.value;
    // Use selectedValue as needed
    console.log('Selected value:', selectedValue);
    console.log('Question Sort value:', questionSortValue);

    let queryParams = null;
    if (questionId != 0) {
      queryParams = {
        qid: questionId,
        sid: this.surveyId,
        sordId: selectedValue,
        curntId: questionSortValue

      };
    }
    this.surveyservice.changeQuestionPosition(queryParams).subscribe(
      (response: String) => {
        console.log('Update successful:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error occurred while uploading:', error);
        // Handle error
      }
    );
  }

  idIsEqual(a: any, b: any): boolean {
    return a === b;
  }


  //preview

  // inputText: string = '';

  // dataArray: string[] = [];

  // addButtonClicked() {
  //   // Remove all whitespace from inputText and assign it to dataArray
  //   this.dataArray = this.inputText.replace(/\s+/g, '').split('\n').filter(item => item.trim() !== '');
  //   console.log(this.dataArray);

  //   this.inputText = '';
  // }

  // lines: string[]
  // processInputText(): void {
  //   this.inputText = this.inputText.replace(/\n+/g, '\n');

  //   console.log(this.lines); // You can use this array as needed
  // }



  inputText: string = '';
  dataArray: string[] = [];

  processInputText(): void {
    // Split the input text by newline characters
    let lines = this.inputText.split('\n');

    // Remove empty elements and trim each line
    lines = lines.filter(line => line.trim() !== '');


    // Join the lines back into a single string with newline characters
    this.inputText = lines.join('\n');
  }

  getFilteredOptions() {
    return this.filteredOptions.filter(option => option.option.trim() !== '');
  }

  addButtonClicked(): void {
    // Split the input text by newline characters and assign it to dataArray
    this.dataArray = this.inputText.split('\n').map(line => line.trim()).filter(line => line !== '');
    console.log(this.dataArray);

    // Clear the input field
    this.inputText = '';

    this.dataArray.forEach((line: string) => {
      // Check if line is not empty
      if (line) {
        let newOption = new Option();
        newOption.option = line.trim();
        newOption.createdDate = this.getCurrentDateTime()

        this.optionsArr1.push(newOption); // Push the new Option object to optionsArr1
        console.log("see", this.optionsArr1);
      }
    });

    this.allOptions.push(...this.optionsArr1, ...this.optionsArr2);

  }

  // addButtonClicked(): void {
  //   // Split the input text by newline characters and assign it to dataArray
  //   this.dataArray = this.inputText.split('\n').map(line => line.trim()).filter(line => line !== '');
  //   console.log(this.dataArray);

  //   // Clear the input field
  //   this.inputText = '';

  //   this.dataArray.forEach((line: string) => {
  //     // Check if line is not empty
  //     if (line) {
  //       let newOption = new Option();
  //       newOption.option = line.trim();
  //       newOption.createdDate = this.getCurrentDateTime();

  //       this.optionsArr1.push(newOption);
  //       console.log("see", this.optionsArr1);
  //     }
  //   });

  //   this.allOptions = [...this.optionsArr1, ...this.optionsArr2]; // Update allOptions array
  // }



}
