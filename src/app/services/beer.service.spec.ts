import { TestBed } from '@angular/core/testing';

import { BeerService } from './beer.service';

describe('BreweryService', () => {
  let service: BeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
