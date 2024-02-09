import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/1`);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}`, userData);
  }
}
