import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': `${token}`,
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          alert("Session expired.")
        } else if (err.status === 500) {
          console.error('Internal Server Error:', err);
        }
        return throwError(() => err);
      })
    );
  }
}   
