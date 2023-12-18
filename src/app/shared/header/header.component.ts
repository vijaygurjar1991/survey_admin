import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public constructor(public themeService: DataService, private auth: AuthService,private util: UtilsService) {

  }
  ngOnInit(): void {
    this.getMyAccount()
  }
  logOut() {
    this.auth.logout();
  }
  userId: any;
  image: any;
  getMyAccount() {
    //this.userId = localStorage.getItem("userId");
    this.userId = this.util.getUserId();
    this.themeService.GetMyAccount(this.userId).subscribe((data: any) => {
      console.log("inside header data", data) 
      this.image = data.image
    });
  }
}
