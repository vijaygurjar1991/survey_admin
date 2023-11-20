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
        debugger;
        if (response) {
          localStorage.setItem('authToken', response);
          this.setUserDetails();
        }
        return response;
      })
    );
  }

  setUserDetails() {
    this.userData.next(null);
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      var token = localStorage.getItem('authToken');

      let decodeUserDetails;
      if (token) {
        decodeUserDetails = JSON.parse(window.atob(token.split('.')[1]));
      }
      debugger;
      // userDetails.userName = decodeUserDetails.sub;
      // localStorage.setItem("userName", decodeUserDetails.sub)
      // userDetails.fullName = decodeUserDetails.Name;

      var _userDetail = JSON.parse(decodeUserDetails.user);

      userDetails.role = _userDetail?.Role;
      localStorage.setItem("role", _userDetail?.Role)

      userDetails.userId = _userDetail?.Id;
      localStorage.setItem("userId", _userDetail?.Id)

      userDetails.userName = _userDetail?.Name;
      localStorage.setItem("userName", _userDetail?.Name)

      userDetails.userEmail = _userDetail?.Email;
      localStorage.setItem("userEmail", _userDetail?.Email)

      userDetails.RoleId = _userDetail?.RoleId;
      localStorage.setItem("RoleId", _userDetail?.RoleId)

      this.userData.next(userDetails);
    }
  }

  logout(returnUrl = '') {
    localStorage.removeItem('authToken');
    this.userData.next(null);

    if (returnUrl != '') {
      this.router.navigate(['/login', returnUrl]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
