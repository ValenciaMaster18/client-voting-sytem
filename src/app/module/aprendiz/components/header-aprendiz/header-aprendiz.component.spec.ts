import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAprendizComponent } from './header-aprendiz.component';

describe('HeaderAprendizComponent', () => {
  let component: HeaderAprendizComponent;
  let fixture: ComponentFixture<HeaderAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
