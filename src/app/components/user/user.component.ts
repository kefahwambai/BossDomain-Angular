import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userService.getUser().subscribe((userData: any) => {
      this.user = userData;
      this.userForm.patchValue({
        name: this.user.user.name,
        email: this.user.user.email
      });
    });
  }

  handleSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const userId = this.user.user.id;

      const updateData = formData.password
        ? { ...formData, id: userId }
        : { name: formData.name, email: formData.email, id: userId };

      this.userService.updateUser(userId, updateData).subscribe(
        () => console.log('User data updated successfully'),
        error => console.error('Failed to update user data:', error)
      );
    }
  }
}
