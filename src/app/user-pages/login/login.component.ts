import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/service/data.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaComponent } from 'src/app/shared/captcha/captcha.component';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;


  @Input('Component') isComponent = false;
  errorMessage: string;
  submitted = false;
  loading = false;
  loginForm: FormGroup;
  token: string | undefined;
  constructor(
    private visibilityService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utility: UtilsService
  ) {
    visibilityService.articleVisible.next(false);
    this.token = undefined;
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

    this.createForm();
  }
  LoginSlider: OwlOptions = {
    loop: true,
    items: 1,
    nav: false,
    dots: true
  };


  //login api
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$|^[A-Za-z0-9_-]+([.-][A-Za-z0-9_-]+)*$/),
        ],
      ],
      password: ['', Validators.required],
      rememberMe: [false],
      captchertoken: [false],

    });
  }

  onSubmit() {
    //if (this.captchaComponent.validateCaptcha()) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginForm.removeControl('rememberMe');
      this.errorMessage = '';
      this.loading = true;
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      //this.router.navigate(['/dashboard']);

      const userDetails = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        captchertoken: this.loginForm.get('captchertoken')?.value
      };

      this.authService
        .login(userDetails)
        .pipe(first())
        .subscribe({
          next: (result) => {
            // debugger;
            if (result) {
              this.loginForm.reset();

              this.router.navigateByUrl(returnUrl).then(() => {
                window.location.reload();
              });
            } else {
              this.loading = false;
              this.errorMessage = result;
            }
          },
          error: (errObject) => {
            //console.log(error);
            //Swal.fire('', errObject?.error, 'error');
            this.utility.showError("Please enter correct password ");
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
    //}
  }
}