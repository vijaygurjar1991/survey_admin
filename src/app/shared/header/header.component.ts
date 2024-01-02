import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { SurveyService } from 'src/app/service/survey.service';
import { UtilsService } from 'src/app/service/utils.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { EncryptPipe } from 'src/app/pipes/encrypt.pipe';
import { CryptoService } from 'src/app/service/crypto.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  surveyData: any = [];
  filteredSurveys: any = [];
  surveyControl = new FormControl();

  public constructor(public themeService: DataService, private auth: AuthService,private util: UtilsService,public surveyService: SurveyService,private crypto: CryptoService,private router: Router) {

  }
  ngOnInit(): void {
    this.getMyAccount()
    this.getAllSurveyList()
    this.surveyControl.valueChanges
    .pipe(
      debounceTime(300), // Adjust debounce time as needed
      distinctUntilChanged()
    )
    .subscribe((value: string) => {
      this.filterSurveys(value);
    });
  }
  logOut() {
    this.auth.logout();
  }
  userId: any;
  image: any;
  getMyAccount() {
    //this.userId = localStorage.getItem("userId");
    this.userId = this.util.getUserId();
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("inside header data", data) 
      this.image = data.image
    });
  }
  getAllSurveyList() {
    this.surveyService.GetSurveyList().subscribe((data: any) => {
      this.surveyData = data;
      console.log("surveyData",this.surveyData)
    });
  }
  filterSurveys(value: string) {
    if (!value) {
      this.filteredSurveys = this.surveyData; // Show all surveys if search value is empty
      return;
    }
    value = value.toLowerCase();
    this.filteredSurveys = this.surveyData.filter((survey: any) =>
      survey.name.toLowerCase().includes(value)
    );
  }

  onSurveySelected(event: any) {
    const selectedSurveyName = event.option.value;
    const selectedSurvey = this.surveyData.find((survey: any) => survey.name === selectedSurveyName);
    
    if (selectedSurvey) {
      // Log all properties of the selected survey
      for (const key in selectedSurvey) {
        if (Object.prototype.hasOwnProperty.call(selectedSurvey, key)) {
          console.log(`${key}:`, selectedSurvey[key]);
        }
      }
      console.log("selectedSurveyId",selectedSurvey.surveyId)
      const encryptedId = this.encryptId(selectedSurvey.surveyId); // Assuming you have a function to encrypt the ID
      this.router.navigate(['/survey/manage-survey/', encryptedId]);
      // You can also store this information in a variable for further use if needed
      // this.selectedSurveyDetails = selectedSurvey;
    }
  }
  encryptId(id: number): string {
    const encryptPipe = new EncryptPipe(this.crypto); // Create an instance of the EncryptPipe
    return encryptPipe.transform(id); // Use the transform method of the pipe to encrypt the ID
  }
}
