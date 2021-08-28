import { TestBed } from '@angular/core/testing';

import { SherdogService } from './sherdog.service';

describe('SherdogService', () => {
  let service: SherdogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SherdogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
