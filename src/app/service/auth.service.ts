import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  userData = new BehaviorSubject<User | any>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails: any) {
    return this.http.post(`${this.apiUrl}Login`, userDetails, { responseType: 'text' }).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('X-XSRF-TOKEN', response);
          this.setUserDetails();
        }
        return response;
        //return response as responseDTO;
      })
    );
  }

  setUserDetails() {
    this.userData.next(null);
    if (localStorage.getItem('X-XSRF-TOKEN')) {
      const userDetails = new User();
      var token = localStorage.getItem('X-XSRF-TOKEN');

      let decodeUserDetails;
      if (token) {
        decodeUserDetails = JSON.parse(window.atob(token.split('.')[1]));
      }

      userDetails.userName = decodeUserDetails.sub;
      userDetails.fullName = decodeUserDetails.name;
      userDetails.userId = decodeUserDetails.userId;
      userDetails.isActiveSubscriber = decodeUserDetails.isActiveSubscriber;
      userDetails.role = decodeUserDetails.role;

      this.userData.next(userDetails);
    }
  }

  logout(returnUrl = '') {
    localStorage.removeItem('X-XSRF-TOKEN');
    this.userData.next(null);

    if (returnUrl != '') {
      this.router.navigate(['/login', returnUrl]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
