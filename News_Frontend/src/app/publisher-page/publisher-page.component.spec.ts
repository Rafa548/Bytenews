import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherPageComponent } from './publisher-page.component';

describe('PublisherPageComponent', () => {
  let component: PublisherPageComponent;
  let fixture: ComponentFixture<PublisherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
