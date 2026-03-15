import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post(`${this.api}/login`, data);
  }

  register(data:any){
    return this.http.post(`${this.api}/register`, data);
  }

  verifyOtp(data:any){
    return this.http.post(`${this.api}/verify-otp`, data);
  }

  recoverPassword(data:any){
    return this.http.post(`${this.api}/recover-password`, data);
  }

  changeMasterPassword(data:any){
    return this.http.put(`${this.api}/change-master-password`, data);
  }

  getSecurityQuestions(email: string){
  return this.http.get(`${this.api}/security-questions/${email}`);
}

}