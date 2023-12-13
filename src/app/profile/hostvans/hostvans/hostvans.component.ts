import { Component, OnInit } from '@angular/core';
import { VanService } from 'src/app/services/van/van.service';
import { Observable, map, startWith } from 'rxjs';
import { Van } from 'src/app/util/van.interface';
import { Modal, ModalOptions } from 'flowbite';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hostvans',
  templateUrl: './hostvans.component.html',
  styleUrls: ['./hostvans.component.css'],
})
export class HostvansComponent implements OnInit {
  constructor(
    private readonly vanService: VanService,
    private readonly location: Location,
    private readonly fb: FormBuilder
  ) {}

  // VANS

  hostVans$!: Observable<{ isLoading: boolean; result: Van[] | undefined }>;
  token!: string | null;

  //                         MODAL OPTIONS

  options: ModalOptions = {
    placement: 'top-center',
    backdrop: 'static',
    closable: false,
    onHide: () => {
      this.showModal = !this.showModal;
    },
    onShow: () => {
      this.showModal = !this.showModal;
    },
  };

  showModal: boolean = false;

  //                          MODAL FORM

  editedVan$!: Observable<Van>;
  selectedVan!: Van;
  wasUpdated: boolean = false;
  updateError: boolean = false;

  editVanForm = this.fb.group({
    name: [
      { value: '', disabled: this.wasUpdated || this.updateError },
      [Validators.required],
    ],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required]],
  });

  name = this.editVanForm.get('name');
  price = this.editVanForm.get('price');
  description = this.editVanForm.get('description');

  isSubmitted = false;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    // HOST VANS LIST
    if (this.token !== null) {
      this.hostVans$ = this.vanService.listHostVans(this.token).pipe(
        map((value) => ({ isLoading: false, result: value })),
        startWith({ isLoading: true, result: undefined })
      );
    }
  }

  releaseError = false;
  wasReleased = false;
  releaseLoading = false;

  releaseVan(vanId: string) {
    this.releaseLoading = true;
    if (this.token !== null) {
      this.vanService.releaseVan(vanId, this.token).subscribe({
        error: (err) => {
          this.releaseLoading = false;
          this.releaseError = true;
        },
        next: (value) => {
          this.releaseLoading = false;
          this.wasReleased = true;

          setTimeout(() => {
            this.location.historyGo(0);
          }, 2000);
        },
      });
    }
  }

  // TOGGLE EDIT MODAL

  toggleModal(element: HTMLDivElement, van?: Van) {
    const modal = new Modal(element, this.options, {
      id: 'modal',
      override: true,
    });

    if (van !== undefined) {
      this.selectedVan = van;
    }

    if (this.showModal) {
      this.isSubmitted = false;
      this.name?.setValue('');
      this.description?.setValue('');
      this.price?.setValue(0);
      this.editVanForm.markAsUntouched();
      modal.hide();
    } else {
      modal.show();
      if (van !== undefined) {
        this.name?.setValue(van.name);
        this.description?.setValue(van.description);
        this.price?.setValue(van.price);
      }
    }
  }

  // SUBMIT EDIT FORM
  onEditSubmit() {
    this.isSubmitted = true;

    if (this.editVanForm.valid && this.token !== null) {
      this.vanService
        .updateVan(
          this.selectedVan.id,
          this.token,
          this.name?.value,
          this.price?.value,
          this.description?.value
        )
        .subscribe({
          error: (err: HttpErrorResponse) => {
            this.updateError = true;
          },
          next: (value) => {
            this.wasUpdated = true;
            setTimeout(() => {
              this.location.historyGo(0);
            }, 2000);
          },
        });
    }
  }

  // DELETE MODAL

  toggleDeleteModal: boolean = false;

  deleteError: boolean = false;
  wasDeleted: boolean = false;

  deleteOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    closable: false,
    onHide: () => {
      this.toggleDeleteModal = !this.toggleDeleteModal;
    },

    onShow: () => {
      this.toggleDeleteModal = !this.toggleDeleteModal;
    },
  };

  showDeleteModal(element: HTMLDivElement, van?: Van) {
    const deleteModal = new Modal(element, this.deleteOptions, {
      id: 'delete-modal',
      override: true,
    });

    if (van !== undefined) {
      this.selectedVan = van;
    }

    this.toggleDeleteModal ? deleteModal.hide() : deleteModal.show();
  }

  onDelete() {
    if (this.token !== null) {
      this.vanService.deleteVan(this.selectedVan.id, this.token).subscribe({
        error: (err: HttpErrorResponse) => {
          this.deleteError = true;
        },
        next: (value) => {
          this.wasDeleted = true;

          setTimeout(() => {
            this.location.historyGo(0);
          }, 2000);
        },
      });
    }
  }
}
