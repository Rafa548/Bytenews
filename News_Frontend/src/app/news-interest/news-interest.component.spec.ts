import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInterestComponent } from './news-interest.component';

describe('NewsInterestComponent', () => {
  let component: NewsInterestComponent;
  let fixture: ComponentFixture<NewsInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsInterestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
