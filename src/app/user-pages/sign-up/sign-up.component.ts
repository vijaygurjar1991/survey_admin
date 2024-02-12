import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  formSubmitted: boolean = false;
  showCompanyDetails: boolean = true; // Initially show company details
  showUserDetails: boolean = false;
  themeService: any;
  signupForm: FormGroup;
  verificationForm: FormGroup;
  constructor(private visibilityService: DataService,private fb: FormBuilder,private authService: AuthService,private router: Router,private route: ActivatedRoute,private utility:UtilsService) {
    visibilityService.articleVisible.next(false);
  }
  organizationId:any
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    const password = passwordControl?.value ?? ''; // Using nullish coalescing operator
    const confirmPassword = confirmPasswordControl?.value ?? '';
  
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
      organizationName: ['', [Validators.required, notOnlyWhitespace]],
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
  }

  LoginSlider: OwlOptions = {
    loop: true,
    items: 1,
    nav: false,
    dots: true
  };
  // Upload Image
token: string|undefined;
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
  console.log('Form data:', this.signupForm.value);
  console.log('Valid Form :', this.signupForm.valid);
  this.formSubmitted = true;
  if (this.signupForm.valid) {
    const formData = this.signupForm.value;

    // Call the registration service to make the POST request
    this.authService.registerOrganization(formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        if(response==='AlreadyExits'){
          this.utility.showError("This Organisation Already Registered");
          //EmailAlreadyExits
        }else if(response==='EmailAlreadyExits'){
          this.utility.showError("This Email Id Already Registered");
          //EmailAlreadyExits
        }else{
          this.organizationId=response
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
submitForm() {
  // Handle submission of the final form
  if (this.signupForm.valid) {
    // You can make API calls or perform other actions here
    console.log('Final form data:', this.signupForm.value);
  }
}
verifyEmail() {
  // Call the email verification service to make the GET request
  const otp = this.verificationForm.get('email_otp')?.value;
  const captchertoken =this.verificationForm.get('captchertoken')?.value
  console.log("captchertoken : ",captchertoken)
  const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
  const dataToSend ={
    oId : this.organizationId,
    otp : otp,
    captcha : captchertoken
  }
  this.authService.verifyEmail(dataToSend).subscribe(
    (response) => {
      console.log('Email verification successful:', response);
      //if(response.startWith=='e')
        this.router.navigate([returnUrl]);
      //
      //Swal.fire('Error', 'Please enter correct OTP.', 'error');
      // Handle successful email verification, display a success message, etc.
    },
    (error) => {
      console.error('Email verification failed:', error);
      // Handle email verification failure, display an error message, etc.
    }
  );
}

}
export function notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.trim().length === 0) {
    return { 'notOnlyWhitespace': true };
  } else {
    return null;
  }
}
