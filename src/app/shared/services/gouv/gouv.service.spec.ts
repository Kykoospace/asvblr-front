import { TestBed } from '@angular/core/testing';

import { GouvService } from './gouv.service';

describe('GouvService', () => {
  let service: GouvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GouvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
