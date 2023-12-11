import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostvansComponent } from './hostvans.component';

describe('HostvansComponent', () => {
  let component: HostvansComponent;
  let fixture: ComponentFixture<HostvansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostvansComponent]
    });
    fixture = TestBed.createComponent(HostvansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
