import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleNewsComponent } from './admin-single-news.component';

describe('AdminSingleNewsComponent', () => {
  let component: AdminSingleNewsComponent;
  let fixture: ComponentFixture<AdminSingleNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSingleNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
