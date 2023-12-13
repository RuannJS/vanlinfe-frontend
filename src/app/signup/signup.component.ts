import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  backendError: boolean = false;
  errorMessage!: string;
  userCreated: boolean = false;

  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    role: ['CONSUMER', [Validators.required]],
  });

  name = this.signupForm.get('name');
  password = this.signupForm.get('password');
  email = this.signupForm.get('email');
  role = this.signupForm.get('role');

  availableRoles = ['CONSUMER', 'HOST'];

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    // RESET STATES
    this.backendError = false;
    this.userCreated = false;

    if (this.signupForm.valid) {
      this.userService
        .userSignup(
          this.name?.value,
          this.email?.value,
          this.password?.value,
          this.role?.value
        )
        .subscribe({
          error: (err: HttpErrorResponse) => {
            this.errorMessage = 'There was an error!';
            this.backendError = true;
            this.isLoading = false;

            if (err.status === 409) this.errorMessage = 'Email already in use!';
          },
          next: (value) => {
            this.userCreated = true;
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['signin']);
            }, 3000);
          },
        });
    }
  }
}
