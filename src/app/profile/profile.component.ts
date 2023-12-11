import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../util/user.interface';
import { Observable, map, startWith, tap } from 'rxjs';
import { Van } from '../util/van.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  activeRoute: string = 'underline underline-offset-4 border-2 border-pink-200';

  userInfo$!: Observable<{ isLoading: boolean; result: User | undefined }>;

  userVans$!: Observable<{ isLoading: boolean; result: Van | undefined }>;

  token!: string | null;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token !== null) {
      this.userInfo$ = this.userService.getUserInformation(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );
    }
  }
}
