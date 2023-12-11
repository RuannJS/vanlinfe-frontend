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

  private VAN_URL = `http://localhost:3000/vans/van/`;

  // authorization will come from sessionStorage

  getVanByID(id: string | null, token: string): Observable<Van> {
    return this.http.get<Van>(`${this.VAN_URL}${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  private HOST_VAN_URL = 'http://localhost:3000/vans/host-vans';

  listHostVans(token: string): Observable<Van[]> {
    return this.http.get<Van[]>(this.HOST_VAN_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
