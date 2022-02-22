import { TestBed } from '@angular/core/testing';

import { GetcardsService } from './getcards.service';

describe('GetcardsService', () => {
  let service: GetcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
