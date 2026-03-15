import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:8080/users";

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

}