import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { VanService } from '../services/van/van.service';
import { Van } from '../util/van.interface';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-van-id',
  templateUrl: './van-id.component.html',
  styleUrls: ['./van-id.component.css'],
})
export class VanIDComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: VanService,
    private readonly location: Location
  ) {}

  vanID!: string | null;
  token!: string | null;

  isLoading = false;
  backendError = false;
  isRented = false;
  errorMessage!: string;

  vanDetails$!: Observable<{ isLoading: boolean; result: Van | undefined }>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => (this.vanID = value.get('id')));

    this.token = localStorage.getItem('token');

    if (this.token !== null) {
      this.vanDetails$ = this.service.getVanByID(this.vanID, this.token).pipe(
        map((van) => ({ isLoading: false, result: van })),
        startWith({ isLoading: true, result: undefined })
      );
    }
  }

  rentVan(van: Van | undefined): void {
    this.isLoading = true;

    if (this.token !== null && van?.id) {
      this.service.rentVan(this.token, van.id).subscribe({
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.backendError = true;
          this.errorMessage = 'Please Try again';

          if (err.status === 403) {
            this.errorMessage = "Host accounts can't rent vans";
          }
        },
        next: (value) => {
          this.isRented = true;
          this.isLoading = false;
          setTimeout(() => {
            this.location.historyGo(0);
          }, 4000);
        },
      });
    }
  }

  goBack(): void {
    this.location.historyGo(-1);
  }
}
