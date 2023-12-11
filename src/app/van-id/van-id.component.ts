import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap, map, startWith } from 'rxjs';
import { VanService } from '../services/van/van.service';
import { Van } from '../util/van.interface';
import { Location } from '@angular/common';

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

  vanDetails$!: Observable<{ isLoading: boolean; result: Van | undefined }>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => (this.vanID = value.get('id')));

    this.vanDetails$ = this.service.getVanByID(this.vanID).pipe(
      map((van) => ({ isLoading: false, result: van })),
      startWith({ isLoading: true, result: undefined })
    );
  }

  goBack() {
    this.location.historyGo(-1);
  }
}
