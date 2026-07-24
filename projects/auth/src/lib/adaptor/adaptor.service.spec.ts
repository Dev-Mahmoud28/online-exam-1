import { TestBed } from '@angular/core/testing';

import { AdaptorService } from './adaptor.service';

describe('AdaptorService', () => {
  let service: AdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
