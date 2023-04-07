import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasVotingComponent } from './estadisticas-voting.component';

describe('EstadisticasVotingComponent', () => {
  let component: EstadisticasVotingComponent;
  let fixture: ComponentFixture<EstadisticasVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasVotingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
