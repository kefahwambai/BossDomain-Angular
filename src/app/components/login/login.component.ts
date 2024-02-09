import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async handleSubmit(event: Event) {
    event.preventDefault();

    const formData = {
      email: this.email,
      password: this.password,
    };
  try {
    const userData = await this.authService.login(formData).toPromise();

    if (userData && userData.token) {
      const token = userData.token;
      sessionStorage.setItem('jwt', token);
      console.log(token)
      this.authService.setUser(userData);
      this.email = '';
      this.password = '';
      this.message = 'Login successful!';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1234);
    } else {
      this.loginError = 'Invalid user data received';
    }
  } catch (error) {
    this.loginError = 'Login failed';
    console.error(error);
  }

  }
  logout() {
    this.authService.logout();
  }
}
