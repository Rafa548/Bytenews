import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllNewsComponent } from './admin-all-news.component';

describe('ClassStudentsAdminInfoComponent', () => {
  let component: AdminAllNewsComponent;
  let fixture: ComponentFixture<AdminAllNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
