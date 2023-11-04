import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
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


  //login api

  private apiUrl = 'https://beta.angular.opinionest.com';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/Login`;
    const params = { userName: username, password: password };

    return this.http.get<any>(loginUrl, { params: params });
  }




}
