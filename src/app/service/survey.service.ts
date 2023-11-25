import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  apiUrl = environment.apiUrl;
  userId =0;
  constructor(private http: HttpClient,private util:UtilsService) { 
    this.userId = util.getUserId();
  }
  GetCategories() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Category/GetCategories`)
      .pipe(map((result) => result as responseDTO));
  }

  GetGenericQuestion(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GenericQuestion/GetGenericType`;

    return this.http.get<responseDTO[]>(url);
  }

  GetGenericQuestionType(typeId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GenericQuestion/GetGenericQuestions?typeId=${typeId}`;
    return this.http.get<responseDTO[]>(url);
  }


  GetQuestionTypes(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GenericQuestion/GetQuestionTypes`;
    return this.http.get<responseDTO[]>(url);
  }
  GetStateByCountryID(country_id: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Geography/GetStateByCountryId?countryIds=${country_id}`;
    return this.http.get<responseDTO[]>(url);
  }
  GetCountries(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Geography/GetCountries`;
    return this.http.get<responseDTO[]>(url);
  }
  GetListOfCountry(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Geography/GetGeographyListByCountryId`;
    return this.http.get<responseDTO[]>(url);
  }

  // GetSurveyList
  GetSurveyList(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyList`;
    return this.http.get<responseDTO[]>(url);
  }

  // Create Survey
  CreateSurvey(data: any): Observable<any> {
    const { surveyName, categoryId } = data;
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/CreateSurvey?surveyName=${encodeURIComponent(surveyName)}&categoryId=${categoryId}`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }

  // GetSurveyById(userId: any, surveycategoryid: any): Observable<responseDTO[]> {
  //   userId = localStorage.getItem("userId");
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/GetSurveyById?surveyId=${surveycategoryid}`;
  //   return this.http.get<responseDTO[]>(url);
  // }

  CreateGeneralQuestion(): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/CreateGeneralQuestion`;
    return this.http.post(url, { responseType: 'text' });
  }



  // GetCategoryId(data: any): Observable<any> {
  //   var userId = localStorage.getItem("userId")
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/CreateSurvey`;
  //   console.log("posted data", data);
  //   return this.http.post(url, data, { responseType: 'text' });
  // }
  // GetSurveyByID
  GetSurveyById(surveyId:any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyById?surveyId=${surveyId}`;
    return this.http.get<responseDTO[]>(url);
  }

}