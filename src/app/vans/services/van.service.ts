import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, startWith, tap } from 'rxjs';
import { Van } from '../../../app/util/van.interface';

@Injectable({
  providedIn: 'root',
})
export class VanService {
  constructor(private readonly http: HttpClient) {}

  VANLIST_URL = 'http://localhost:3000/vans/all';

  getVanList(): Observable<{ isLoading: boolean; results: undefined | Van[] }> {
    return this.http.get<Van[]>(this.VANLIST_URL).pipe(
      map((results) => ({ isLoading: false, results })),
      startWith({ isLoading: true, results: undefined })
    );
  }
}
