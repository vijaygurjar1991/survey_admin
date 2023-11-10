import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http
      .get<responseDTO>(`${this.apiUrl}api/admin/${userId}/Category/GetCategories`)
      .pipe(map((result) => result as responseDTO));
  }

  GetGenericQuestion(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetGenericType`;

    return this.http.get<responseDTO[]>(url);
  }

  GetGenericQuestionType(userId: any, typeId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetGenericQuestions?typeId=${typeId}`;

    return this.http.get<responseDTO[]>(url);
  }


  GetQuestionTypes(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/GenericQuestion/GetQuestionTypes`;

    return this.http.get<responseDTO[]>(url);
  }
  GetStateByCountryID(userId: any, country_id: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetStateByCountryId?countryIds=${country_id}`;

    return this.http.get<responseDTO[]>(url);
  }
  GetCountries(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetCountries`;

    return this.http.get<responseDTO[]>(url);
  }
  GetListOfCountry(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/Geography/GetGeographyListByCountryId`;

    return this.http.get<responseDTO[]>(url);
  }
}