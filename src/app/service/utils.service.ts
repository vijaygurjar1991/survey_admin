import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private userId:any;
  private role:any;
  private centerId:any;
  

  constructor(private auth: AuthService,private toastr: ToastrService) { 
    this.auth.userData$.subscribe({
      next: (user: User) => {
        this.userId = user.userId;
        this.role = user.role;
        this.centerId = user.CenterId;
      }
    });
  }

  getUserId() {
    return this.userId;
  }

  getRole() {
    return this.role;
  }

  getCenterId(){
    return this.centerId;
  }
  showSuccess(message: string) {
    this.toastr.success(message, 'Success');
  }
  showError(message: string) {
    this.toastr.error(message, 'Failed');
  }
}
