import { Component, HostListener, OnInit } from '@angular/core';
import { VanService } from '../services/van/van.service';
import { Observable, Subject, map, startWith, tap } from 'rxjs';
import { Van } from '../util/van.interface';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vans',

  templateUrl: './vans.component.html',
  styleUrls: ['./vans.component.css'],
})
export class VansComponent implements OnInit {
  constructor(
    private readonly service: VanService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {}

  vanListView$!: Observable<{ isLoading: boolean; results: undefined | Van[] }>;

  queryParam!: Params;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.location.historyGo(0);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.queryParams.subscribe((value) => (this.queryParam = value));

    if (this.queryParam?.['type'] === undefined) {
      this.vanListView$ = this.service.getVanList().pipe(
        map((value) => ({ isLoading: false, results: value })),
        startWith({ isLoading: true, results: undefined })
      );
    } else {
      this.vanListView$ = this.service.getVanList().pipe(
        map((value) => ({
          isLoading: false,
          results: value.filter(
            (vans) => vans.type === this.queryParam?.['type']
          ),
        })),
        startWith({ isLoading: true, results: undefined })
      );
    }
  }

  filterVans(type: string) {
    this.router.navigate(['vans'], { queryParams: { type } });

    this.vanListView$ = this.service.getVanList().pipe(
      map((value) => ({
        isLoading: false,
        results: value.filter(
          (vans) => vans.type === this.queryParam?.['type']
        ),
      })),
      startWith({ isLoading: true, results: undefined })
    );
  }

  clearFilter() {
    this.router.navigate(['vans']);

    this.vanListView$ = this.service.getVanList().pipe(
      map((value) => ({ isLoading: false, results: value })),
      startWith({ isLoading: true, results: undefined })
    );
  }
}
