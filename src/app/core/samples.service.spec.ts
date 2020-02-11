import { TestBed } from '@angular/core/testing';

import { SamplesService } from './samples.service';

describe('SamplesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SamplesService = TestBed.get(SamplesService);
    expect(service).toBeTruthy();
  });
});
