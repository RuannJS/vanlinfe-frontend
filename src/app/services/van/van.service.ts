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

  private ADD_VAN_URL = 'http://localhost:3000/vans/add';

  addVan(
    token: string,
    name: string | null | undefined,
    price: number | null | undefined,
    description: string | null | undefined,
    type: string | null | undefined,
    imageUrl: string
  ): Observable<Van> {
    return this.http.post<Van>(
      this.ADD_VAN_URL,
      {
        name,
        price,
        description,
        type,
        imageUrl,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  private EDIT_VAN_URL = 'http://localhost:3000/vans/update/';

  updateVan(
    vanID: string,
    token: string,
    name: string | null | undefined,
    price: number | null | undefined,
    description: string | null | undefined
  ): Observable<Van> {
    return this.http.put<Van>(
      `${this.EDIT_VAN_URL}${vanID}`,

      { name, price, description },
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  private DELETE_VAN_URL = 'http://localhost:3000/vans/delete/';

  deleteVan(vanID: string, token: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.DELETE_VAN_URL}${vanID}`, {
      headers: { authorization: `Bearer ${token}` },
    });
  }
}
