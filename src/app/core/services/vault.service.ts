import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  // private api = "http://localhost:8080/vault";
  private api = `${environment.apiUrl}/vault`;

  constructor(private http: HttpClient) {}

  getUserVault(userId:number){
    return this.http.get(`${this.api}/user/${userId}`);
  }

  addCredential(data:any){
    return this.http.post(`${this.api}/add`, data);
  }

  searchVault(userId:any, query:any){
  return this.http.get(`${this.api}/search?userId=${userId}&query=${query}`);
}

filterVault(userId:any, category:any){
  return this.http.get(`${this.api}/filter?userId=${userId}&category=${category}`);
}

getFavorites(userId:any){
  return this.http.get(`${this.api}/sort/favorites?userId=${userId}`);
}

deleteVault(id:number){
  return this.http.delete(`${this.api}/${id}`, { responseType: 'text' });
}

decryptPassword(id: number, masterPassword: string) {

  return this.http.post(
    "http://localhost:8080/vault/decrypt",
    {
      id: id.toString(),
      masterPassword: masterPassword
    },
    { responseType: 'text' }
  );
}

exportVault(userId:number){
  return this.http.get(`${this.api}/export/${userId}`, {
    responseType: 'text'
  });
}

importVault(userId:number, file:File){

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId.toString());

  return this.http.post(`${this.api}/import`, formData, {
    responseType: 'text'
  });

}


}