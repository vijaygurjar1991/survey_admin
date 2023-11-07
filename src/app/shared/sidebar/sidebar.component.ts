import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent {
  constructor(private modalService: NgbModal, public themeService: DataService, private auth: AuthService, private surveyservice: SurveyService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit() {
    this.surveyservice.getData().subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  logOut() {
    this.auth.logout();
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

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


  searchControl = new FormControl();
  options: string[] = ['Automotive', 'Beverages - Alcholic',
    'Beverages - Alcholic',
    'Cosmetic, Personal Care, Toiletries', 'Education', 'Electronics', 'Entertaiment', 'Fashion, Clothing'];
  filteredOptions: Observable<string[]> | undefined;



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

}
