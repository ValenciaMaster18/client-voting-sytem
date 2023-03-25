import { TestBed } from '@angular/core/testing';

import { RedirectLoginGuard } from './redirect-login.guard';

describe('RedirectLoginGuard', () => {
  let guard: RedirectLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
