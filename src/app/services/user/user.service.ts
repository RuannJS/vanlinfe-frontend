import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../../../app/util/token.interface';
import { User } from '../../../app/util/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  private SIGNIN_URL = 'http://localhost:3000/user/signin';

  userSignin(
    email: string | null | undefined,
    password: string | null | undefined
  ): Observable<Token> {
    return this.http.post<Token>(this.SIGNIN_URL, { email, password });
  }

  private SIGNUP_URL = 'http://localhost:3000/user/signup';

  userSignup(
    name: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined,
    role: string | null | undefined
  ): Observable<User> {
    return this.http.post<User>(this.SIGNUP_URL, {
      name,
      email,
      password,
      role,
    });
  }

  private USER_INFO_URL = 'http://localhost:3000/user/info';

  getUserInformation(token: string): Observable<User> {
    return this.http.get<User>(this.USER_INFO_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
