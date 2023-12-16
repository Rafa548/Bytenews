import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllDetailsPageComponent } from './admin-all-details-page.component';

describe('AdminAllDetailsPageComponent', () => {
  let component: AdminAllDetailsPageComponent;
  let fixture: ComponentFixture<AdminAllDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAllDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
