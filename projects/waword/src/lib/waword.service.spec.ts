import { TestBed } from '@angular/core/testing';

import { WawordService } from './waword.service';

describe('WawordService', () => {
  let service: WawordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WawordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
