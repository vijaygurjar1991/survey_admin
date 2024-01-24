import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private userId:any;
  private role:any;
  private centerId:any;
  

  constructor(private auth: AuthService) { 
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
}
