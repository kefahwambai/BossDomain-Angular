import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  message: string = '';
  signupError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();

    const formData = {
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    };

    this.authService.signup(formData).subscribe(
      (response) => {
        this.message = 'Registration successful!';
        this.router.navigate(['/login']);
      },
      (error) => {
        this.signupError = 'Registration failed';
        console.error(error);
      }
    );
  }
}