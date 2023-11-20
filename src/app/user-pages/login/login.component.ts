import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/service/data.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input('Component') isComponent = false;
  errorMessage: string;
  submitted = false;
  loading = false;
  loginForm: FormGroup;

  constructor(
    private visibilityService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
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
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginForm.removeControl('rememberMe');
      this.errorMessage = '';
      this.loading = true;
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      //this.router.navigate(['/dashboard']);

      this.authService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe({
          next: (result) => {
            if (result) {
              this.loginForm.reset();

              this.router.navigate([returnUrl]);
            } else {
              this.loading = false;
              this.errorMessage = result;
            }
          },
          error: (errObject) => {
            //console.log(error);
            Swal.fire('', errObject?.error, 'error');
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }


}