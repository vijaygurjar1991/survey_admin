import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';
import { responseGenericQuestion } from '../types/responseGenericQuestion';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  apiUrl = environment.apiUrl;
  userId = 0;
  constructor(private http: HttpClient, private util: UtilsService) {
    this.userId = util.getUserId();
  }
  GetCategories() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Category/GetCategories`)
      .pipe(map((result) => result as responseDTO));
  }

  GetGenericQuestion(countryId:any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GenericQuestion/GetGenericType?countryId=${countryId}`;
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
  GetListOfCountry(country_id: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Geography/GetGeographyListByCountryId?countryIds=${country_id}`;
    return this.http.get<responseDTO[]>(url);
  }

  // GetSurveyList
  // GetSurveyList(): Observable<responseDTO[]> {
  //   const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyList`;
  //   return this.http.get<responseDTO[]>(url);
  // }

  // Create Survey
  createSurvey(data: any): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/CreateSurvey`;

    // Create a new object without circular references
    const sanitizedData = this.removeCircularReferences(data);

    console.log("posted data", sanitizedData);
    return this.http.post(url, sanitizedData, { responseType: 'text' });
  }
  //Update Survey
  updateSurvey(data: any): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/UpdateSurvey`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }

  // GetSurveyById(userId: any, surveycategoryid: any): Observable<responseDTO[]> {
  //   userId = localStorage.getItem("userId");
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/GetSurveyById?surveyId=${surveycategoryid}`;
  //   return this.http.get<responseDTO[]>(url);
  // }

  CreateGeneralQuestion(data: any): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/CreateGeneralQuestion`;
    return this.http.post(url, data, { responseType: 'text' });
  }
  updateGeneralQuestion(data: any): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/UpdateGeneralQuestion`;
    return this.http.post(url, data, { responseType: 'text' });
  }



  // GetCategoryId(data: any): Observable<any> {
  //   var userId = localStorage.getItem("userId")
  //   const url = `${this.apiUrl}api/admin/${userId}/Survey/CreateSurvey`;
  //   console.log("posted data", data);
  //   return this.http.post(url, data, { responseType: 'text' });
  // }
  // GetSurveyByID
  GetSurveyById(surveyId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyById?surveyId=${surveyId}`;
    return this.http.get<responseDTO[]>(url);
  }
  getQuestionDetailsById(questionId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/QuestionById?qid=${questionId}`;
    return this.http.get<responseDTO[]>(url);
  }
  getLogicValues() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Logics/GetValues`)
      .pipe(map((result) => result as responseDTO));
  }
  getLogicThens() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Logics/GetThens`)
      .pipe(map((result) => result as responseDTO));
  }
  updateSurveyStatus(data: any): Observable<any> {
    const { surveyId,surveyStatus } = data;
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/UpdateSurvey?surveyId=${encodeURIComponent(surveyId)}&status=${encodeURIComponent(surveyStatus)}`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }
  getLogicQuestionList(data: any) {
    const { surveyId,questionId } = data;
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/GetList?surveyID=${encodeURIComponent(surveyId)}`)
      .pipe(map((result) => result as responseDTO));
  }
  createLogic(data: any): Observable<any> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/CreateLogics`;
    return this.http.post(url, data, { responseType: 'text' });
  }
  getGenericQuestionType1(typeId: any): Observable<responseGenericQuestion[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/GenericQuestion/GetGenericQuestions?typeId=${typeId}`;
    return this.http.get<responseGenericQuestion[]>(url);
  }
  uploadImageQuestion(file: File,queryParams: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/UploadQuestionImage`;
    if (queryParams) {
      const queryParamsString = new URLSearchParams(queryParams).toString();
      url += `?${queryParamsString}`;
    }
    return this.http.post(url, formData,{responseType: 'text'});
  }
  uploadVideoQuestion(file: File,queryParams: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/UploadQuestionVideo`;
    if (queryParams) {
      const queryParamsString = new URLSearchParams(queryParams).toString();
      url += `?${queryParamsString}`;
    }
    return this.http.post(url, formData,{responseType: 'text'});
  }
  changeQuestionPosition(queryParams: any): Observable<any> {
  
    let url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/ChangeQuestionPosition`;
    if (queryParams) {
      const queryParamsString = new URLSearchParams(queryParams).toString();
      url += `?${queryParamsString}`;
    }
    return this.http.get(url,{responseType: 'text'});
  }
  getOptionsLogicValues() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Logics/GetOptionLogicValue`)
      .pipe(map((result) => result as responseDTO));
  }
  getOptionsByQuestionId(queryParams: any): Observable<any> {
  
    let url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/GetOptions`;
    if (queryParams) {
      const queryParamsString = new URLSearchParams(queryParams).toString();
      url += `?${queryParamsString}`;
    }
    return this.http.get(url,{responseType: 'text'});
  }
  getCountries() {
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${this.userId}/Geography/GetCountries`)
      .pipe(map((result) => result as responseDTO));
  }
  removeCircularReferences(data: any): any {
    const seen = new WeakSet();
    const sanitizedData = JSON.parse(JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    }));

    return sanitizedData;
  }
  getSurveyListWithPage(pageNumber: number, pageSize: number): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyList?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<responseDTO[]>(url);
  }
  //getSurveyDetailsById
  getSurveyDetailsById(pageNumber: number, pageSize: number,surveyId:number): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyById?surveyId=${surveyId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<responseDTO[]>(url);
  }
  GetRecentSurveyList(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/RecentCreatedSurvey`;
    return this.http.get<responseDTO[]>(url);
  }
  // GetSurveyList(): Observable<responseDTO[]> {
  //   const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyList`;
  //   return this.http.get<responseDTO[]>(url);
  // }
  GetSurveyList(): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${this.userId}/Survey/GetSurveyList?pageNumber=1&pageSize=100`;
    return this.http.get<responseDTO[]>(url);
  }
  getQuestionLogics(qid: number, sid: number): Observable<any> {
    const params = {
      qid: qid.toString(),
      sid: sid.toString()
    };
    const url = `${this.apiUrl}api/admin/${this.userId}/GeneralQuestion/GetLogics`;
    return this.http.get<any>(url, { params });
  }
}