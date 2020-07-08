import { TestBed } from '@angular/core/testing';

import { SharePasswordService } from './share-password.service';

describe('SharePasswordService', () => {
  let service: SharePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
