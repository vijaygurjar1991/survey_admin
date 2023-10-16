import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
  
})
export class SidebarComponent {

  constructor(private modalService: NgbModal) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
  
  //Auto Search
    // searchTerm = '';
    // suggestions: string[] = [];
    // showSuggestions = false;

    // onInputChange() {
    //   this.suggestions = ['Automotive', 'Beverages - Alcholic', 
    //   'Beverages - Alcholic', 
    //   'Cosmetic, Personal Care, Toiletries', 'Education', 'Electronics', 'Entertaiment', 'Fashion, Clothing'];
    //   this.showSuggestions = this.suggestions.length > 0;
    // }
    // selectSuggestion(suggestion: string) {
    //   this.searchTerm = suggestion;
    //   this.showSuggestions = false;
    // }
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
