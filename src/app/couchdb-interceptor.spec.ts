import { TestBed } from '@angular/core/testing';

import { CouchDBInterceptor } from './couchdb-interceptor';

describe('CouchdbInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouchDBInterceptor = TestBed.get(CouchDBInterceptor);
    expect(service).toBeTruthy();
  });
});
