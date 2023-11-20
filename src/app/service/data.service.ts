import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isSidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this.isSidebarVisibleSubject.asObservable();

  // Collapse left sidebar
  public addMargin: boolean = false;
  public addwidth: boolean = false;
  public dashboardMargin: boolean = false;
  public toggle(): void {
    this.addMargin = !this.addMargin;
    this.addwidth = !this.addwidth;
    this.dashboardMargin = !this.dashboardMargin;
  }

  private headerVisibleSubject = new BehaviorSubject<boolean>(true);
  private footerVisibleSubject = new BehaviorSubject<boolean>(true);
  private navbarVisibleSubject = new BehaviorSubject<boolean>(true);
  private breadcrumbVisibleSubject = new BehaviorSubject<boolean>(true);
  public articleVisible = new BehaviorSubject<boolean>(true);

  headerVisible$ = this.headerVisibleSubject.asObservable();
  footerVisible$ = this.footerVisibleSubject.asObservable();
  navbarVisible$ = this.navbarVisibleSubject.asObservable();
  breadcrumbVisible$ = this.breadcrumbVisibleSubject.asObservable();

  toggleHeaderVisibility(visible: boolean) {
    this.headerVisibleSubject.next(visible);
  }

  toggleFooterVisibility(visible: boolean) {
    this.footerVisibleSubject.next(visible);
  }

  toggleNavbarVisibility(visible: boolean) {
    this.navbarVisibleSubject.next(visible);
  }

  toggleSidebar() {
    this.isSidebarVisibleSubject.next(!this.isSidebarVisibleSubject.value);
  }

  toggleBreadcrumbVisibility(visible: boolean) {
    this.breadcrumbVisibleSubject.next(visible);
  }

  // APIs
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // About Us get & Post APIs
  GetAboutUs(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/AboutUs/GetAboutUs`;
    return this.http.get<responseDTO[]>(url);
  }
  CreateAboutUs(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/AboutUs/CreateAboutUs`;
    console.log("posted data", data);
    return this.http.post<responseDTO[]>(url, data);
  }
  // About Us get & Post APIs

  // PrivacyPolicy get & Post APIs
  GetPrivacyPolicy(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/PrivacyPolicy/GetPrivacyPolicy`;
    return this.http.get<responseDTO[]>(url);
  }
  CreatePrivacyPolicy(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/PrivacyPolicy/CreatePrivacyPolicy`;
    console.log("posted data", data);
    return this.http.post<responseDTO[]>(url, data);
  }
  // PrivacyPolicy get & Post APIs

  // Terms&Conditions get & Post APIs
  GetTermsConditions(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/TermAndCondition/GetTermAndConditions`;
    return this.http.get<responseDTO[]>(url);
  }
  CreateTermsConditions(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/TermAndCondition/CreateTermAndCondition`;
    console.log("posted data", data);
    return this.http.post<responseDTO[]>(url, data);
  }
  // Terms&Conditions get & Post APIs



  // APIs


}
