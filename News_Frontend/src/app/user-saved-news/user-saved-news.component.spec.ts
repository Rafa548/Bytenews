import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSavedNewsComponent } from './user-saved-news.component';

describe('UserSavedNewsComponent', () => {
  let component: UserSavedNewsComponent;
  let fixture: ComponentFixture<UserSavedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSavedNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSavedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
