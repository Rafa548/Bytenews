import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllInterestsComponent } from './admin-all-interests.component';

describe('AdminAllInterestsComponent', () => {
  let component: AdminAllInterestsComponent;
  let fixture: ComponentFixture<AdminAllInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllInterestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAllInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
