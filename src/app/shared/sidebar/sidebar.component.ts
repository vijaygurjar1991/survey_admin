import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
  
})
export class SidebarComponent {
  isSubMenu1Visible = false;
  isSubMenu2Visible = false;
  isSubMenu3Visible = false;

  toggleSubMenu(subMenuNumber: number) {
    switch (subMenuNumber) {
      case 1:
        this.isSubMenu1Visible = !this.isSubMenu1Visible;
        break;
      case 2:
        this.isSubMenu2Visible = !this.isSubMenu2Visible;
        break;
      case 3:
        this.isSubMenu3Visible = !this.isSubMenu3Visible;
        break;      
      default:
        break;
    }
  }
  
}
