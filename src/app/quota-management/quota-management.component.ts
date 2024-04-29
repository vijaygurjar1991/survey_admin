import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SurveyService } from '../service/survey.service';
import { responseDTO } from '../types/responseDTO';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-quota-management',
  templateUrl: './quota-management.component.html',
  styleUrls: ['./quota-management.component.css']
})
export class QuotaManagementComponent {
  selectedQuestion: string;
  isQuotasVisible: boolean = false;
  showQuotasDiv: boolean = false;

  surveyData: any;
  baseUrl = '';
  surveyId: any;
  quotasurveyid: any;
  surveyName: any;
  countryName: any;
  countryImage: any;
  categoryName: any;
  centerId: any


  constructor(private route: ActivatedRoute, private visibilityService: DataService, private modalService: NgbModal, private surveyservice: SurveyService, private utils: UtilsService) {
    this.baseUrl = environment.baseURL;

  }
  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  status: string;
  ngOnInit() {
    this.centerId = this.utils.getCenterId();
    this.hideBreadcrumb();
    // get surveydata
    this.route.paramMap.subscribe(_params => {
      this.surveyData = history.state.surveyData;
      if (this.surveyData) {
        //const { surveyName, countryName, countryImage, categoryName, otherCategoryName, surveyId } = this.surveyData;
        this.surveyId = this.surveyData.surveyId;
        this.surveyName = this.surveyData.surveyName;
        this.countryName = this.surveyData.countryName;
        this.countryImage = this.surveyData.countryImage;
        this.categoryName = this.surveyData.categoryName;
        this.categoryName = this.surveyData.otherCategoryName;
        this.countryImage = this.surveyData.countryImage;
        this.status = this.surveyData.status;
        console.log('Survey Data:', this.surveyData);
        console.log("quota surveyid", this.surveyId)
      } else {
        console.log('Survey data is undefined or null.');
      }
    });
    this.GetSurveyDetails();

  }
  showCountError: boolean = false;

  showQuotas() {
    if (this.surveycount <= 0 || isNaN(this.surveycount)) {
      this.showCountError = true;
      return;
    }

    this.showCountError = false;
    this.isQuotasVisible = true;
  }
  open(contentInterlock: any) {
    this.modalService.open(contentInterlock)
  }
  // Show add quotas
  quotas: any[] = [{ selectedQuestion: 'Select Question', showQuotasDiv: false }];
  addQuota() {
    this.quotas.push({ selectedQuestion: '', showQuotasDiv: false });
  }

  // addQuota(index: number) {
  //   this.quotas.splice(index + 1, 0, { selectedQuestion: '', showQuotasDiv: false });
  // }


  showQuestionQuotas(index: number) {
    if (this.quotas[index].selectedQuestion !== 'Select Question') {
      this.quotas[index].showQuotasDiv = true;
    } else {
      this.quotas[index].showQuotasDiv = false;
    }
  }
  // Show and hide Census/Custom dive
  // showCensusDiv: boolean = false;
  // showCustomDiv: boolean = false;
  // censusActive: boolean = false;
  // customActive: boolean = false;
  // toggleCensus(index:number) {
  //   this.showCensusDiv = true;
  //   this.showCustomDiv = false;
  //   this.censusActive = true;
  //   this.customActive = false;
  // }
  // toggleCustom(index:number) {
  //   this.showCensusDiv = false;
  //   this.showCustomDiv = true;
  //   this.censusActive = false;
  //   this.customActive = true;
  // }
  // toggleNone(index:number) {
  //   this.showCensusDiv = false;
  //   this.showCustomDiv = false;
  //   this.censusActive = false;
  //   this.customActive = false;
  // }

  showCensusDiv: boolean[] = [];
  showCustomDiv: boolean[] = [];
  censusActive: boolean[] = [];
  customActive: boolean[] = [];
  activeValue: string = '';

  toggleCensus(index: number) {
    this.showCensusDiv[index] = true;
    this.showCustomDiv[index] = false;
    this.censusActive[index] = true;
    this.customActive[index] = false;
    this.activeValue = 'census';
    console.log("activewer", this.activeValue)
  }

  toggleCustom(index: number) {
    this.showCensusDiv[index] = false;
    this.showCustomDiv[index] = true;
    this.censusActive[index] = false;
    this.customActive[index] = true;
    this.activeValue = 'custom';
    console.log("activewer", this.activeValue)
  }

  toggleNone(index: number) {
    this.showCensusDiv[index] = false;
    this.showCustomDiv[index] = false;
    this.censusActive[index] = false;
    this.customActive[index] = false;
    this.activeValue = 'none';
    console.log("activewer", this.activeValue)
  }
  // Show and hide Census/Custom dive
  activeIndex: number = 0; // Initially set to 0 for the first item
  items: string[] = ['Gender', 'Age', 'Region']; // Array of dynamic items
  toggleActive(index: number) {
    this.activeIndex = index;
  }



  // question api

  questionList: any;
  genericlist: any[] = [];
  optionlist: any[] = [];
  questions: any[] = []
  pageSize: number = 10;
  pageNumber: number = 1
  surveycount: number;
  totalsum: number[] = [];

  GetSurveyDetails() {
    this.questionList = '';
    this.surveyservice.getSurveyDetailsById(this.pageNumber, this.pageSize, this.surveyId).subscribe((data: any) => {
      this.questionList = data;
      console.log("questionList", this.questionList);

      this.questionList.questions.forEach((question: any) => {
        if (question.genericType) {
          this.genericlist.push(question.genericType);
        }
        console.log("qwerty", this.genericlist)
      });

      if (this.questionList && Array.isArray(this.questionList.questions)) {
        this.questionList.questions.forEach((question: any) => {
          if (question.options && Array.isArray(question.options)) {
            question.options.forEach((option: any) => {
              this.optionlist.push(option.option);
            });
          }
        });
        console.log("optioneee", this.optionlist);
      }

    });
  }


  // selectedoptions: any[] = [];
  // selectedOptionsCount: any
  // selectedgenericType: any
  // selectedquestion: any

  // Initialize arrays to store selected question details
  selectedquestionid: any[] = []
  selectedquestion: any[] = [];
  selectedgenericType: string[] = [];
  selectedoptions: any[] = [];
  selectedOptionsCount: number[] = [];
  selectedoptionid: any[] = []


  // selectedOptionDetails(selectedQuestionId: any,index:number) {

  //   //console.log('question list =', this.questionList.questions)

  //   const selectedQuestion = this.questionList.questions.find((item: { id: any; }) => {
  //     return item.id == selectedQuestionId;
  //   });

  //   console.log("selectedQuestion", selectedQuestion)
  //   console.log("Selected question:", selectedQuestion.question);
  //   console.log("genericType", selectedQuestion.genericType)
  //   this.selectedquestion = selectedQuestion.question
  //   this.selectedgenericType = selectedQuestion.genericType
  //   if (selectedQuestion && Array.isArray(selectedQuestion.options)) {
  //     const selectedOptions = selectedQuestion.options;

  //     console.log("Selected question options:", selectedOptions);
  //     this.selectedoptions = selectedOptions;
  //     this.selectedOptionsCount = this.selectedoptions.length;
  //     console.log("Number of selected options:", this.selectedOptionsCount);
  //     return selectedOptions;
  //   }
  // }

  selectedOptionDetails(selectedQuestionId: any, index: number) {

    const selectedQuestion = this.questionList.questions.find((item: { id: any; }) => {
      return item.id == selectedQuestionId;
    });

    console.log("Selected question at index " + index + ":", selectedQuestion.question);
    console.log("Selected id at index " + index + ":", selectedQuestion.id);
    this.selectedquestionid = selectedQuestion.id
    console.log("GenericType at index " + index + ":", selectedQuestion.genericType);

    // Initialize the arrays if they are not defined
    if (!this.selectedquestion[index]) this.selectedquestion[index] = "";
    if (!this.selectedgenericType[index]) this.selectedgenericType[index] = "";
    if (!this.selectedoptions[index]) this.selectedoptions[index] = [];
    if (!this.selectedOptionsCount[index]) this.selectedOptionsCount[index] = 0;

    // Store selected question details at the corresponding index

    this.selectedquestion[index] = selectedQuestion.question;
    this.selectedgenericType[index] = selectedQuestion.genericType;

    if (selectedQuestion && Array.isArray(selectedQuestion.options)) {
      const selectedOptions = selectedQuestion.options;

      console.log("Selected question options at index " + index + ":", selectedOptions);

      this.selectedoptions[index] = selectedOptions;

      this.selectedoptionid[index] = this.selectedoptions[index].map((option: any) => option.id);

      console.log("qwertyuio", typeof (this.selectedoptionid))
      console.log("qwertyuio", this.selectedoptionid[index])
      console.log("qwerty selectedoptions", this.selectedoptions[index])
      this.selectedOptionsCount[index] = this.selectedoptions[index].length;
      console.log("Number of selected options at index " + index + ":", this.selectedOptionsCount[index]);

      // return selectedOptions;
      this.questionList.questions = this.questionList.questions.filter((question: any) => question.id !== this.selectedquestionid);

      console.log("asdfghj", this.questionList.questions)

      return selectedOptions;
    }

  }



  dividedValue: any
  equallyDividedValue(index: number) {

    this.dividedValue = Math.floor(this.surveycount / this.selectedOptionsCount[index]);
    console.log("dividedValue", this.dividedValue)

    this.totalsum[index] = this.dividedValue * this.selectedOptionsCount[index]


    return this.dividedValue;

  }

  createsurveyId: any

  getCurrentDateTime(): string {
    const currentDateTime = new Date().toISOString();
    return currentDateTime.substring(0, currentDateTime.length - 1) + 'Z';
  }

  saveQuota(index: number) {
    console.log("saving quota", [index])
    const dataToSend = {
      quotaId: 0,
      surveyId: this.surveyId,
      totalUsers: this.surveycount,
      centerId: this.centerId,
      status: "ACT",
      createdDate: this.getCurrentDateTime(),
      questionDto: {
        quotaQuestionsId: 0,
        quotaId: 0,
        questionId: this.selectedquestionid,
        type: this.activeValue,
        interlock: 0,
        isOpenEnded: false,
        optionsDto: [] as { quotaOptionsId: number; quotaQuestionId: number; optionId: any; userCount: number }[]
      }
    };


    const options = this.selectedoptionid[index];

    options.forEach((optionId: any) => {
      const optionsDto = {
        quotaOptionsId: 0,
        quotaQuestionId: 0,
        optionId: optionId,
        userCount: this.dividedValue
      }
      dataToSend.questionDto.optionsDto.push(optionsDto);
    });





    this.surveyservice.createQuota(dataToSend).subscribe(
      resp => {
        console.log("create quota", resp)
      },
      error => {
        console.log("err create", error)
      }
    )


  }
  customValue: number[] = [];
  updateTotalSum(index: number) {
    this.totalsum[index] = this.customValue[index] * this.selectedOptionsCount[index];
    console.log("updated", this.totalsum[index])
  }



}
