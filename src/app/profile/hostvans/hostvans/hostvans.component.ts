import { Component, OnInit } from '@angular/core';
import { VanService } from 'src/app/services/van/van.service';
import { Observable, map, startWith } from 'rxjs';
import { Van } from 'src/app/util/van.interface';

@Component({
  selector: 'app-hostvans',
  templateUrl: './hostvans.component.html',
  styleUrls: ['./hostvans.component.css'],
})
export class HostvansComponent implements OnInit {
  constructor(private readonly vanService: VanService) {}

  hostVans$!: Observable<{ isLoading: boolean; result: Van[] | undefined }>;

  token!: string | null;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token !== null) {
      this.hostVans$ = this.vanService.listHostVans(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );
    }
  }
}
