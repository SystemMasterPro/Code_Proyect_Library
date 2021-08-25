import { TestBed } from '@angular/core/testing';

import { ChackLoginGuard } from './chack-login.guard';

describe('ChackLoginGuard', () => {
  let guard: ChackLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChackLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
