import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4040';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  signup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, formData);
  }

  logout(): void {
    sessionStorage.removeItem('userData');
    this.userSubject.next(null); 
    alert('Logout Successful!');
    this.router.navigate(['/home']);
  }

  setUser(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.userSubject.next(userData);
  }

  getUser(): any {
    const userDataString = sessionStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  checkAuthentication(): void {
    const storedToken = sessionStorage.getItem('jwt');

    if (storedToken) {
      const [, payloadBase64] = storedToken.split('.');

      try {
        const decodedPayload = atob(payloadBase64);
        const parsedPayload = JSON.parse(decodedPayload);

        const expirationTime = parsedPayload.exp * 1000;
        const currentTime = new Date().getTime();

        if (currentTime > expirationTime) {
          this.setUser(null);
          sessionStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        } else {
          this.setUser(parsedPayload);
        }
      } catch (error) {
        console.error('Error parsing token payload:', error);
      }
    } else {
      console.log('User not found');
    }
  }
}
