import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprenticesComponent } from './view-apprentices.component';

describe('ViewApprenticesComponent', () => {
  let component: ViewApprenticesComponent;
  let fixture: ComponentFixture<ViewApprenticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApprenticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApprenticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
