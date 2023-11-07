import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const token = localStorage.getItem('X-XSRF-TOKEN');
    const headers = new HttpHeaders()
    if (token !== null) {
      console.log("token", token)
      headers.set('X-XSRF-TOKEN', token);
    }


    return this.http.get(this.apiUrl + 'api/admin/1/Category/GetCategories', { headers });
  }
}