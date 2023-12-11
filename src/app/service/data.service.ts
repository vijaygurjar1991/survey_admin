import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { responseDTO } from '../types/responseDTO';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isSidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this.isSidebarVisibleSubject.asObservable();

  private userId:any;

  // Collapse left sidebar
  public addMargin: boolean = false;
  public addwidth: boolean = false;
  public dashboardMargin: boolean = false;
  public toggle(): void {
    this.addMargin = !this.addMargin;
    this.addwidth = !this.addwidth;
    this.dashboardMargin = !this.dashboardMargin;
  }

  public closeSideBar(){
    this.addMargin = true;
    this.addwidth = true;
    this.dashboardMargin = true;
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
  constructor(private http: HttpClient,private util: UtilsService) { 
    this.userId = util.getUserId();
  }

  // About Us get & Post APIs
  GetAboutUs(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/AboutUs/GetAboutUs`;
    return this.http.get<responseDTO[]>(url);
  }
  CreateAboutUs(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/AboutUs/CreateAboutUs`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
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
    return this.http.post(url, data, { responseType: 'text' });
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
    return this.http.post(url, data, { responseType: 'text' });
  }
  // Terms&Conditions get & Post APIs

  // MyAccount get & Post APIs
  GetMyAccount(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/Profile/GetProfileById?usetId=${userId}`;
    return this.http.get<responseDTO[]>(url);
  }
  CreateMyAccount(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/Profile/UpdateProfile`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }
  // MyAccount get & Post APIs

  // ChangePassword Api 
  ChangePassword(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/Profile/ChangePassword`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }
  // ChangePassword Api

  // User get & Post APIs
  GetAllUser(userId: any): Observable<responseDTO[]> {
    const url = `${this.apiUrl}api/admin/${userId}/Profile/GetProfile`;
    return this.http.get<responseDTO[]>(url);
  }
  AddNewUser(data: any): Observable<any> {
    var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/Profile/CreateProfile`;
    console.log("posted data", data);
    return this.http.post(url, data, { responseType: 'text' });
  }
  uploadImage(file: File,userId:any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    //var userId = localStorage.getItem("userId")
    const url = `${this.apiUrl}api/admin/${userId}/Profile/ChangeProfileImage`;
    // Replace 'your_upload_endpoint' with your actual upload API endpoint
    return this.http.post<any>(url, formData);
  }
  // User get & Post APIs


  // APIs





}
