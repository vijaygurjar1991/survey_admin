import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/service/data.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CaptchaComponent } from 'src/app/shared/captcha/captcha.component';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  // @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;


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
      // captchertoken: [false],

    });
  }



}
