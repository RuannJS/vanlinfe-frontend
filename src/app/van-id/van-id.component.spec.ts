import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanIDComponent } from './van-id.component';

describe('VanIDComponent', () => {
  let component: VanIDComponent;
  let fixture: ComponentFixture<VanIDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanIDComponent]
    });
    fixture = TestBed.createComponent(VanIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
