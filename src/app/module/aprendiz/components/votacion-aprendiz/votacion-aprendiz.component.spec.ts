import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionAprendizComponent } from './votacion-aprendiz.component';

describe('VotacionAprendizComponent', () => {
  let component: VotacionAprendizComponent;
  let fixture: ComponentFixture<VotacionAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotacionAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotacionAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
