import { TestBed } from '@angular/core/testing';

import { GetAprendizService } from './get-aprendiz.service';

describe('GetAprendizService', () => {
  let service: GetAprendizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAprendizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
