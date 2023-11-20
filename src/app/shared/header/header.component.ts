import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public constructor(public themeService: DataService, private auth: AuthService,) {

  }

  logOut() {
    this.auth.logout();
  }
}
