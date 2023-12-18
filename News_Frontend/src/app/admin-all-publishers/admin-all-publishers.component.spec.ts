import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllPublishersComponent } from './admin-all-publishers.component';

describe('AdminAllPublishersComponent', () => {
  let component: AdminAllPublishersComponent;
  let fixture: ComponentFixture<AdminAllPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllPublishersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAllPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
