import { Component, OnInit } from '@angular/core';
import { initFlowbite, Collapse } from 'flowbite';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private readonly service: UserService) {}
  ngOnInit(): void {
    initFlowbite();
  }

  activeRouteClass = 'underline underline-offset-4';
  expandNavbar = false;

  token = localStorage.getItem('token');

  collapseNav(target: HTMLDivElement) {
    const collapse = new Collapse(target);

    this.expandNavbar ? collapse.collapse() : collapse.expand();

    this.expandNavbar = !this.expandNavbar;
  }

  checkUserLogin(): boolean {
    if (this.token === null) return false;

    return true;
  }
}
