import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private API = "http://localhost:8080/security";

  constructor(private http: HttpClient) {}

  getAudit(userId:number): Observable<any>{
    return this.http.get(`${this.API}/audit/${userId}`);
  }
}