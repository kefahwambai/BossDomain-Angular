import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4040'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthentication();
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/1`);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}`, userData);
  }
}
