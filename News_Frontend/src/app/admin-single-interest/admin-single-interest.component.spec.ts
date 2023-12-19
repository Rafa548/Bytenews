import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleInterestComponent } from './admin-single-interest.component';

describe('AdminSingleInterestComponent', () => {
  let component: AdminSingleInterestComponent;
  let fixture: ComponentFixture<AdminSingleInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSingleInterestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
