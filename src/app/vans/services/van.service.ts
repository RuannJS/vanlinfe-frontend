import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, startWith, tap } from 'rxjs';
import { Van } from '../../../app/util/van.interface';

@Injectable({
  providedIn: 'root',
})
export class VanService {
  constructor(private readonly http: HttpClient) {}

  private VANLIST_URL = 'http://localhost:3000/vans/all';

  getVanList(): Observable<Van[]> {
    return this.http.get<Van[]>(this.VANLIST_URL);
  }
}
