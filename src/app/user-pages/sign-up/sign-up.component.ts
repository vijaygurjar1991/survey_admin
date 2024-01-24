import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  showCompanyDetails: boolean = true; // Initially show company details
  showUserDetails: boolean = false;
  themeService: any;
  signupForm: FormGroup;
  verificationForm: FormGroup;
  constructor(private visibilityService: DataService,private fb: FormBuilder,private authService: AuthService,private router: Router) {
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
      organizationName: ['', Validators.required],
      fullName: ['', Validators.required],
      zipCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    this.verificationForm = this.fb.group({
      email_otp: ['', Validators.required],
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
  if (this.signupForm.valid) {
    const formData = this.signupForm.value;

    // Call the registration service to make the POST request
    this.authService.registerOrganization(formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.organizationId=response
        this.showUserDetails = true;
        // Handle successful registration, navigate to another page, etc.
      },
      (error) => {
        console.error('Registration failed:', error);
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
  this.authService.verifyEmail(this.organizationId, otp,captchertoken).subscribe(
    (response) => {
      console.log('Email verification successful:', response);
      if(response==true)
        this.router.navigate(['/login']);
      else
      Swal.fire('Error', 'Please enter correct OTP.', 'error');
      // Handle successful email verification, display a success message, etc.
    },
    (error) => {
      console.error('Email verification failed:', error);
      // Handle email verification failure, display an error message, etc.
    }
  );
}

}
