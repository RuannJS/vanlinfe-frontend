import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VanService } from 'src/app/services/van/van.service';

@Component({
  selector: 'app-addvan',
  templateUrl: './addvan.component.html',
  styleUrls: ['./addvan.component.css'],
})
export class AddvanComponent implements OnInit {
  constructor(
    private readonly vanService: VanService,
    private readonly fb: FormBuilder,
    private readonly location: Location
  ) {}

  token!: string | null;

  vanForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1), Validators.max(10000)]],
    description: ['', [Validators.required]],
    type: ['simple', Validators.required],
  });

  name = this.vanForm.get('name');
  price = this.vanForm.get('price');
  type = this.vanForm.get('type');
  description = this.vanForm.get('description');

  selectedImage: { isSelected: boolean; image: string } = {
    isSelected: false,
    image: '',
  };

  isSubmitted = false;

  vanType = ['simple', 'rugged', 'luxury'];

  wasCreated = false;
  createError = false;
  errorMessage!: string;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  selectFile(event: any) {
    const vanImage = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(vanImage);

    reader.onload = (event: any) => {
      this.selectedImage = { isSelected: true, image: event.target.result };
    };
  }

  onSubmit() {
    this.createError = false;
    this.wasCreated = false;
    this.isSubmitted = true;

    if (this.vanForm.valid && this.selectedImage.isSelected) {
      if (this.token !== null) {
        this.vanService
          .addVan(
            this.token,
            this.name?.value,
            this.price?.value,
            this.description?.value,
            this.type?.value,
            this.selectedImage.image
          )
          .subscribe({
            error: (err: HttpErrorResponse) => {
              this.createError = true;

              this.errorMessage = 'Oops! There was an error, try again!';

              if (err.status === 413) this.errorMessage = 'Image is too large!';
            },
            next: (value) => {
              this.wasCreated = true;
              setTimeout(() => {
                this.location.historyGo(0);
              }, 1500);
            },
          });
      }
    }
  }
}
