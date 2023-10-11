import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './service/data.service';

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
  constructor(private router: ActivatedRoute, private visibilityService: DataService, public themeService: DataService) {
    this.visibilityService.headerVisible$.subscribe(visible => {
      this.headerVisible = visible;
    });
    this.visibilityService.navbarVisible$.subscribe(visible => {
      this.navbarVisible = visible;
    });
  }



  ngOnInit() {
    // debugger;
    //  console.log(this.router.snapshot?.url[0].path);
  }
}