import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: UserService
  ) {}

  isSubmitted = false;

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  email = this.signInForm.get('email');
  password = this.signInForm.get('password');

  onSubmit() {
    this.isSubmitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    this.service.userSignin(this.email?.value, this.password?.value);
  }
}
