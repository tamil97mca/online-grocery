import { TestBed } from '@angular/core/testing';

import { UserRegisterDateService } from './user-register-date.service';

describe('UserRegisterDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRegisterDateService = TestBed.get(UserRegisterDateService);
    expect(service).toBeTruthy();
  });
});
