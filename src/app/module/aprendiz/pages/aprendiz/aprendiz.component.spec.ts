import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprendizComponent } from './aprendiz.component';

describe('AprendizComponent', () => {
  let component: AprendizComponent;
  let fixture: ComponentFixture<AprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
