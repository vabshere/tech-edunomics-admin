import { TestBed, async, inject } from '@angular/core/testing';

import { LocalUserGuard } from './local-user.guard';

describe('LocalUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalUserGuard]
    });
  });

  it('should ...', inject([LocalUserGuard], (guard: LocalUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
