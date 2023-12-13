import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: UserService,
    private readonly router: Router
  ) {}

  isSubmitted = false;

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  email = this.signInForm.get('email');
  password = this.signInForm.get('password');

  backendError = false;

  onSubmit() {
    const route = this.router;
    this.isSubmitted = true;
    this.backendError = false;
    if (this.signInForm.invalid) {
      return;
    }
    this.service
      .userSignin(this.email?.value, this.password?.value)

      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.backendError = true;
        },
        next(value) {
          localStorage.setItem('token', value.token.split(' ')[1]);
          route.navigate(['profile/dashboard']).then(() => {
            window.location.reload();
          });
        },
      });
  }
}
