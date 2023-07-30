import { TestBed } from '@angular/core/testing';

import { RequirementserviceService } from './requirementservice.service';

describe('RequirementserviceService', () => {
  let service: RequirementserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
