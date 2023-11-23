import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  GetCategories(userId: any) {
    userId = localStorage.getItem("userId");
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${userId}/Category/GetCategories`)
      .pipe(map((result) => result as responseDTO));
  }

  GetGenericQuestion(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetGenericType`;

    return this.http.get<responseDTO[]>(url);
  }

  GetGenericQuestionType(userId: any, typeId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetGenericQuestions?typeId=${typeId}`;
    return this.http.get<responseDTO[]>(url);
  }


  GetQuestionTypes(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetQuestionTypes`;
    return this.http.get<responseDTO[]>(url);
  }
  GetStateByCountryID(userId: any, country_id: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetStateByCountryId?countryIds=${country_id}`;
    return this.http.get<responseDTO[]>(url);
  }
  GetCountries(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetCountries`;
    return this.http.get<responseDTO[]>(url);
  }
  GetListOfCountry(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetGeographyListByCountryId`;
    return this.http.get<responseDTO[]>(url);
  }

  // GetSurveyList
  GetSurveyList(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/Survey/GetSurveyList`;
    return this.http.get<responseDTO[]>(url);
  }

  // Create Survey
  CreateSurvey(data: any): Observable<any> {
    var userId = localStorage.getItem("userId");
    const { surveyName, categoryId } = data;
    const url = `${this.apiUrl}api/admin/${userId}/Survey/CreateSurvey?surveyName=${encodeURIComponent(surveyName)}&categoryId=${categoryId}`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }

  // GetSurveyById(userId: any, surveycategoryid: any): Observable<responseDTO[]> {
  //   userId = localStorage.getItem("userId");
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/GetSurveyById?surveyId=${surveycategoryid}`;
  //   return this.http.get<responseDTO[]>(url);
  // }

  CreateGeneralQuestion(userId: any): Observable<any> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/GeneralQuestion/CreateGeneralQuestion`;
    return this.http.post(url, { responseType: 'text' });
  }



  // GetCategoryId(data: any): Observable<any> {
  //   var userId = localStorage.getItem("userId")
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/CreateSurvey`;
  //   console.log("posted data", data);
  //   return this.http.post(url, data, { responseType: 'text' });
  // }
  // GetSurveyByID
  GetSurveyById(userId: any): Observable<responseDTO[]> {
    userId = localStorage.getItem("userId");
    const url = `${this.apiUrl}api/admin/${userId}/Survey/GetSurveyById?surveyId=3`;
    return this.http.get<responseDTO[]>(url);
  }

}