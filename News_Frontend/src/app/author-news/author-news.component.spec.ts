import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNewsComponent } from './author-news.component';

describe('AuthorNewsComponent', () => {
  let component: AuthorNewsComponent;
  let fixture: ComponentFixture<AuthorNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
