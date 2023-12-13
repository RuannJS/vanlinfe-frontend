import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, map, startWith, tap } from 'rxjs';
import { User } from 'src/app/util/user.interface';
import { Van } from 'src/app/util/van.interface';
import { VanService } from 'src/app/services/van/van.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly vanService: VanService
  ) {}

  userInfo$!: Observable<{ isLoading: boolean; result: User | undefined }>;
  hostVans$!: Observable<{ isLoading: boolean; result: Van[] | undefined }>;

  rentedVans!: number;
  availableVans!: number;

  token!: string | null;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token !== null) {
      this.userInfo$ = this.userService.getUserInformation(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );

      this.hostVans$ = this.vanService.listHostVans(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );

      // Available VANS

      this.vanService
        .listHostVans(this.token)
        .pipe(map((value) => value.filter((van) => van.isRented === false)))
        .subscribe((value) => (this.availableVans = value.length));

      // Rented Vans

      this.vanService
        .listHostVans(this.token)
        .pipe(map((value) => value.filter((van) => van.isRented === true)))
        .subscribe((value) => (this.rentedVans = value.length));
    }
  }
}
