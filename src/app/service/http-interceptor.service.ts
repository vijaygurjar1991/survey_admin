import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private isLoginPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
      console.log('Is Login Page:', this.isLoginPage);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    
    if (token && !this.isLoginPage) {
      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': `${token}`,
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && !this.isLoginPage) {
          alert("Session expired.");
          this.authService.logout();
        } else if (err.status === 500) {
          console.error('Internal Server Error:', err);
        }
        return throwError(() => err);
      })
    );
  }
}
