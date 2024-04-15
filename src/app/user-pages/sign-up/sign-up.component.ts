import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  baseUrl = '';
  // Tooltip
  showTooltip: { [key: string]: boolean } = {};
  toggleTooltip(identifier: string) {
    this.showTooltip[identifier] = !this.showTooltip[identifier];
  }
  hideTooltip(identifier: string) {
    this.showTooltip[identifier] = false;
  }
  // Tooltip

  formSubmitted: boolean = false;
  showCompanyDetails: boolean = true; // Initially show company details
  showUserDetails: boolean = false;
  themeService: any;
  signupForm: FormGroup;
  verificationForm: FormGroup;
  purchaseprice: any;
  verifyemail: any;
  constructor(private visibilityService: DataService, private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private utility: UtilsService) {
    visibilityService.articleVisible.next(false);
    this.baseUrl = environment.baseURL;
  }
  organizationId: any
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
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
    this.signupForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      fullName: ['', Validators.required],
      zipCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    this.verificationForm = this.fb.group({
      email_otp: ['', Validators.required],
      captchertoken: ['', Validators.required],
    });

    //url
    this.route.queryParams.subscribe((data) => {
      this.purchaseprice = data['price'];
    });
    console.log("purchaseprice", this.purchaseprice)
  }

  LoginSlider: OwlOptions = {
    loop: true,
    items: 1,
    nav: false,
    dots: true
  };
  // Upload Image
  token: string | undefined;
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
  generateOTP() {
    Object.keys(this.signupForm.controls).forEach(field => {
      const control = this.signupForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    console.log('Form data:', this.signupForm.value);
    console.log('Valid Form :', this.signupForm.valid);
    this.formSubmitted = true;
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      // Call the registration service to make the POST request
      this.authService.registerOrganization(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          if (response === 'AlreadyExits') {
            this.utility.showError("This Organisation Already Registered");
            //EmailAlreadyExits
          } else if (response === 'EmailAlreadyExits') {
            this.utility.showError("This Email Id Already Registered");
            //EmailAlreadyExits
          } else {
            this.organizationId = response
            this.showUserDetails = true;
          }
        },
        (error) => {
          console.error('Registration failed:', error);
          this.utility.showError(error);
          // Handle registration failure, display an error message, etc.
        }
      );
    }
  }
  // submitForm() {
  //   // Handle submission of the final form
  //   Object.keys(this.signupForm.controls).forEach(field => {
  //     const control = this.signupForm.get(field);
  //     control?.markAsTouched({ onlySelf: true });
  //   });
  //   if (this.signupForm.valid) {
  //     // You can make API calls or perform other actions here
  //     console.log('Final form data:', this.signupForm.value);
  //   }
  // }
  // verifyEmail() {
  //   Object.keys(this.verificationForm.controls).forEach(field => {
  //     const control = this.verificationForm.get(field);
  //     control?.markAsTouched({ onlySelf: true });
  //   });
  //   // Call the email verification service to make the GET request
  //   const otp = this.verificationForm.get('email_otp')?.value;
  //   const captchertoken = this.verificationForm.get('captchertoken')?.value
  //   console.log("captchertoken : ", captchertoken)
  //   if (this.verificationForm.valid) {
  //     const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
  //     const dataToSend = {
  //       oId: this.organizationId,
  //       otp: otp,
  //       captcha: captchertoken
  //     }
  //     this.authService.verifyEmail(dataToSend).subscribe(
  //       (response) => {
  //         this.verifyemail = true
  //         console.log('Email verification successful:', response);
  //         this.router.navigateByUrl(returnUrl).then(() => {
  //           window.location.reload();
  //         });
  //       },
  //       (error) => {
  //         console.error('Email verification failed:', error);
  //         this.utility.showError("Please enter correct OTP ");
  //         // Handle email verification failure, display an error message, etc.
  //       }
  //     );
  //   }
  // }
  verifyEmail() {
    Object.keys(this.verificationForm.controls).forEach(field => {
      const control = this.verificationForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    // Call the email verification service to make the GET request
    const otp = this.verificationForm.get('email_otp')?.value;
    const captchertoken = this.verificationForm.get('captchertoken')?.value
    console.log("captchertoken : ", captchertoken)
    if (this.verificationForm.valid) {
      // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      const dataToSend = {
        oId: this.organizationId,
        otp: otp,
        captcha: captchertoken
      }
      this.authService.verifyEmail(dataToSend).subscribe(
        (response) => {
          this.verifyemail = true
          console.log('Email verification successful:', response);
          // this.router.navigateByUrl(returnUrl).then(() => {
          //   window.location.reload();
          // });
        },
        (error) => {
          console.error('Email verification failed:', error);
          this.utility.showError("Please enter correct OTP ");
          // Handle email verification failure, display an error message, etc.
        }
      );
    }
  }

  //read url
  suurveypurchaseprice: boolean = false
  emailopt: boolean = false

  purchasepriceplan() {
    this.verifyEmail();
    if (this.verifyemail) {
      this.suurveypurchaseprice = true;
      // this.showUserDetails = false;
    }

  }

  redirectDashboard() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.router.navigateByUrl(returnUrl).then(() => {
      window.location.reload();
    })

  }

}

