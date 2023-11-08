import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';

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
}