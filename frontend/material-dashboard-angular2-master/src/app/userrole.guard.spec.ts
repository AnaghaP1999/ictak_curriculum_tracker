import { TestBed } from '@angular/core/testing';

import { UserroleGuard } from './userrole.guard';

describe('UserroleGuard', () => {
  let guard: UserroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
