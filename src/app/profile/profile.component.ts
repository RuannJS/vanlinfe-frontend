import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../util/user.interface';
import { Observable, map, startWith } from 'rxjs';
import { Van } from '../util/van.interface';
import { Modal, ModalOptions } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  activeRoute: string = 'underline underline-offset-4 border-2 border-pink-200';

  userInfo$!: Observable<{ isLoading: boolean; result: User | undefined }>;

  userVans$!: Observable<{ isLoading: boolean; result: Van | undefined }>;

  token!: string | null;

  // LOGOUT

  showLogoutModal: boolean = false;

  logoutOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    closable: false,
    onHide: () => {
      this.showLogoutModal = !this.showLogoutModal;
    },
    onShow: () => {
      this.showLogoutModal = !this.showLogoutModal;
    },
  };

  logoutModal(element: HTMLDivElement) {
    const modal = new Modal(element, this.logoutOptions, {
      id: 'logout-modal',
      override: true,
    });

    this.showLogoutModal ? modal.hide() : modal.show();
  }

  logoutUser(element: HTMLDivElement) {
    const modal = new Modal(element, this.logoutOptions, {
      id: 'logout-modal',
      override: true,
    });

    modal.hide();
    localStorage.removeItem('token');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token !== null) {
      this.userInfo$ = this.userService.getUserInformation(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );
    }
  }
}
