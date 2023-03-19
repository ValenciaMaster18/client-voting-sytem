import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVotingComponent } from './add-voting.component';

describe('AddVotingComponent', () => {
  let component: AddVotingComponent;
  let fixture: ComponentFixture<AddVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVotingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
