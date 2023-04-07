import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminSecundaryComponent } from './header-admin-secundary.component';

describe('HeaderAdminSecundaryComponent', () => {
  let component: HeaderAdminSecundaryComponent;
  let fixture: ComponentFixture<HeaderAdminSecundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAdminSecundaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdminSecundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
