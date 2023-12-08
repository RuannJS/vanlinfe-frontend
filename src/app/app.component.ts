import { Component, OnInit } from '@angular/core';
import { initFlowbite, Collapse } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }

  activeRouteClass = 'underline underline-offset-4';
  expandNavbar = false;

  collapseNav(target: HTMLDivElement) {
    const collapse = new Collapse(target);

    this.expandNavbar ? collapse.collapse() : collapse.expand();

    this.expandNavbar = !this.expandNavbar;
  }
}
