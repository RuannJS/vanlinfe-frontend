import { Component, OnInit } from '@angular/core';
import { VanService } from './services/van.service';
import { Observable, Subject, map, startWith, tap } from 'rxjs';
import { Van } from '../util/van.interface';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-vans',

  templateUrl: './vans.component.html',
  styleUrls: ['./vans.component.css'],
})
export class VansComponent implements OnInit {
  constructor(
    private readonly vans: VanService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  vanList$!: Observable<{ isLoading: boolean; results: undefined | Van[] }>;

  vanListView$!: Observable<{ isLoading: boolean; results: undefined | Van[] }>;

  queryParam!: Params;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.queryParams.subscribe((value) => (this.queryParam = value));
    this.vanList$ = this.vans.getVanList();

    if (this.queryParam?.['type'] === undefined) {
      this.vanListView$ = this.vanList$;
    } else {
      this.vanListView$ = this.vanListView$ = this.vanList$.pipe(
        map((value) => ({
          isLoading: false,
          results: value.results?.filter(
            (vans) => vans.type === this.queryParam?.['type']
          ),
        })),
        startWith({ isLoading: true, results: undefined })
      );
    }
  }

  async filterVans(type: string) {
    await this.router.navigate(['vans'], { queryParams: { type } });

    this.vanListView$ = this.vanList$.pipe(
      map((value) => ({
        isLoading: false,
        results: value.results?.filter(
          (vans) => vans.type === this.queryParam?.['type']
        ),
      })),
      startWith({ isLoading: true, results: undefined })
    );
  }

  clearFilter() {
    this.router.navigate(['vans']);

    this.vanListView$ = this.vanList$;
  }
}
