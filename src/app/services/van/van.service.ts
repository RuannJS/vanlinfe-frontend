import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Van } from '../../util/van.interface';

@Injectable({
  providedIn: 'root',
})
export class VanService {
  constructor(private readonly http: HttpClient) {}

  private VANLIST_URL = 'http://localhost:3000/vans/all/';

  getVanList(): Observable<Van[]> {
    return this.http.get<Van[]>(this.VANLIST_URL);
  }

  private VAN_URL = `http://localhost:3000/vans/`;

  getVanByID(id: string | null): Observable<Van> {
    return this.http.get<Van>(`${this.VAN_URL}${id}`, {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ09OU1VNRVIiLCJlbWFpbCI6ImNvbnN1bWVyQGNvbnN1bWVyLmNvbSIsImlhdCI6MTcwMjI1NzQzNH0.XLNf0dHHH_TEToF4z5IYhGU-SP8r0dTgLm9jiAtzz_8',
      },
    });
  }
}
