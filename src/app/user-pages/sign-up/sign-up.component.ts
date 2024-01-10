import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  showCompanyDetails: boolean = true; // Initially show company details
  showUserDetails: boolean = false;
  themeService: any;

  constructor(
    private visibilityService: DataService,
    
  ) {
    visibilityService.articleVisible.next(false);
  }
  hideHeader() {
    this.visibilityService.toggleHeaderVisibility(false);
  }
  showHeader() {
    this.visibilityService.toggleHeaderVisibility(true);
  }
  hideSideBar() {
    this.visibilityService.toggleNavbarVisibility(false);
  }
  showSideBar() {
    this.visibilityService.toggleNavbarVisibility(true);
  }

  hideBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(false);
  }

  ShowBreadcrumb() {
    this.visibilityService.toggleBreadcrumbVisibility(true);
  }

  ngOnInit() {
    this.hideHeader();
    this.hideSideBar();
    this.hideBreadcrumb();

  }
  LoginSlider: OwlOptions = {
    loop: true,
    items: 1,
    nav: false,
    dots: true
  };
  // Upload Image
  
selectedImage: string | ArrayBuffer | null = null;
defaultImage: string = './assets/images/profile/pic.png';
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.selectedImage = reader.result;
      };
  } else {
      this.selectedImage = null; // Reset selected image if no file is chosen
  }
}


}
