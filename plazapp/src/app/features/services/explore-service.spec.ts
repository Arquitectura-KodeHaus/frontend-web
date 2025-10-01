import { TestBed } from '@angular/core/testing';

import { ExploreService } from './explore-service';

describe('Explore', () => {
  let service: ExploreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
