import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprenticesComponent } from './add-apprentices.component';

describe('AddApprenticesComponent', () => {
  let component: AddApprenticesComponent;
  let fixture: ComponentFixture<AddApprenticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprenticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprenticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
