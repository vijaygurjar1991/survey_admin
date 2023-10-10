import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isSidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this.isSidebarVisibleSubject.asObservable();


  private headerVisibleSubject = new BehaviorSubject<boolean>(true);
  private footerVisibleSubject = new BehaviorSubject<boolean>(true);
  private navbarVisibleSubject = new BehaviorSubject<boolean>(true);

  headerVisible$ = this.headerVisibleSubject.asObservable();
  footerVisible$ = this.footerVisibleSubject.asObservable();
  navbarVisible$ = this.navbarVisibleSubject.asObservable();

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
}