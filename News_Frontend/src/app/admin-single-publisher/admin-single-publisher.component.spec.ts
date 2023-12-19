import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSinglePublisherComponent } from './admin-single-publisher.component';

describe('AdminSinglePublisherComponent', () => {
  let component: AdminSinglePublisherComponent;
  let fixture: ComponentFixture<AdminSinglePublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSinglePublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSinglePublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
