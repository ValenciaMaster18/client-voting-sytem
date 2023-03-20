import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvApprenticesComponent } from './csv-apprentices.component';

describe('CsvApprenticesComponent', () => {
  let component: CsvApprenticesComponent;
  let fixture: ComponentFixture<CsvApprenticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvApprenticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvApprenticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
