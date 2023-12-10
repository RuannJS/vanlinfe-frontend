import { Component, OnInit } from '@angular/core';
import { VanService } from './services/van.service';
import { Observable } from 'rxjs';
import { Van } from '../util/van.interface';

@Component({
  selector: 'app-vans',

  templateUrl: './vans.component.html',
  styleUrls: ['./vans.component.css'],
})
export class VansComponent implements OnInit {
  constructor(private readonly vans: VanService) {}

  vanList$!: Observable<{ isLoading: boolean; results: undefined | Van[] }>;
  isLoading = true;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoading = false;
    this.vanList$ = this.vans.getVanList();
  }
}
