import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleUserComponent } from './admin-single-user.component';

describe('AdminSingleUserComponent', () => {
  let component: AdminSingleUserComponent;
  let fixture: ComponentFixture<AdminSingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSingleUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
