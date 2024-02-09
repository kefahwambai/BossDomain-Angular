import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();


  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  signup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, formData);

  }

  logout(): void {
    sessionStorage.removeItem('userData');
  }

  setUser(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  getUser(): any {
    const userDataString = sessionStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  updateUser(user: any): void {
    this.userSubject.next(user);
  }

}