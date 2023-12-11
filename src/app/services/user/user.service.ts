import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../../../app/util/token.interface';
import { User } from '../../../app/util/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private SIGNIN_URL = 'http://localhost:3000/user/signin';

  private USER_INFO_URL = 'http://localhost:3000/user/info';

  userSignin(
    email: string | null | undefined,
    password: string | null | undefined
  ) {
    this.http
      .post<Token>(this.SIGNIN_URL, { email, password })
      .subscribe((value) =>
        localStorage.setItem('token', value.token.split(' ')[1])
      );

    // ERROR HANDLING !!

    this.router.navigate(['profile']);
  }

  getUserInformation(token: string): Observable<User> {
    return this.http.get<User>(this.USER_INFO_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
