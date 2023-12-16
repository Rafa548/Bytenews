import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardLightComponent } from './news-card-light.component';

describe('NewsCardLightComponent', () => {
  let component: NewsCardLightComponent;
  let fixture: ComponentFixture<NewsCardLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardLightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCardLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
