import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'survey-admin';
  layout: string = '';
  constructor(private router: ActivatedRoute) {

  }
  ngOnInit() {
    // debugger;
    //  console.log(this.router.snapshot?.url[0].path);
  }
}
