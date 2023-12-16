import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardDarkComponent } from './news-card-dark.component';

describe('NewsCardDarkComponent', () => {
  let component: NewsCardDarkComponent;
  let fixture: ComponentFixture<NewsCardDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardDarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCardDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
