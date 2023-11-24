import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { CryptoService } from './service/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'survey-admin';
  layout: string = '';
  headerVisible: boolean = true;
  navbarVisible: boolean = true;
  breadcrumbVisible: boolean = true;
  articleVisible: boolean = true;


  constructor(private router: ActivatedRoute, public visibilityService: DataService, public themeService: DataService,
    private auth: AuthService) {

    this.visibilityService.headerVisible$.subscribe(visible => {
      this.headerVisible = visible;
    });

    this.visibilityService.navbarVisible$.subscribe(visible => {
      this.navbarVisible = visible;
    });
    this.visibilityService.breadcrumbVisible$.subscribe(visible => {
      this.breadcrumbVisible = visible;
    });
    // auth.userData.subscribe((user) => {
    //   if (user) {
    //     this.visibilityService.headerVisible$.subscribe(visible => {
    //       this.headerVisible = visible;
    //     });

    //     this.visibilityService.navbarVisible$.subscribe(visible => {
    //       this.navbarVisible = visible;
    //     });
    //     this.visibilityService.breadcrumbVisible$.subscribe(visible => {
    //       this.breadcrumbVisible = visible;
    //     });
    //   } else {
    //     this.headerVisible = false;
    //     this.navbarVisible = false;
    //     this.breadcrumbVisible = false;
    //     this.articleVisible = false;
    //   }
    // });
  }

  ngOnInit() {
    // debugger;
    this.visibilityService.isSidebarVisibleSubject.next(true);

    // debugger;
    //  console.log(this.router.snapshot?.url[0].path);
  }

}