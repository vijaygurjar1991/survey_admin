import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { LoaderService } from './service/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
//implements OnInit, AfterViewInit 
{
  title = 'survey-admin';
  layout: string = '';
  headerVisible: boolean = true;
  navbarVisible: boolean = true;
  breadcrumbVisible: boolean = true;
  articleVisible: boolean = true;


  constructor(private router: ActivatedRoute, public visibilityService: DataService, public themeService: DataService,
    private auth: AuthService, public loaderservice: LoaderService, private modalService: NgbModal) {

    this.visibilityService.headerVisible$.subscribe(visible => {
      this.headerVisible = visible;
    });

    this.visibilityService.navbarVisible$.subscribe(visible => {
      this.navbarVisible = visible;
    });
    this.visibilityService.breadcrumbVisible$.subscribe(visible => {
      this.breadcrumbVisible = visible;
    });
  }

  ngOnInit() {
    this.auth.initializeUserDetails();

    this.visibilityService.isSidebarVisibleSubject.next(true);
  }

  onMouseEnter() {
    this.themeService.setHoverAddWidth(true);
  }

  onMouseLeave() {
    this.themeService.setHoverAddWidth(false);
  }

  // @ViewChild('content') modalContent: any;
  //modalOpened = false;

  // Open modal on window load
  // ngAfterViewInit() {
  //   if (!this.modalOpened) { 
  //     this.openModalOnLoad();
  //     this.modalOpened = true; 
  //   }
  // }
  // openModalOnLoad() {    
  //   this.modalService.open(this.modalContent, { size: 'lg' });
  // }
  // Open modal on window load

  
}