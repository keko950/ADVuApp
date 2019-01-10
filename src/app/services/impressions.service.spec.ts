import { TestBed, inject } from '@angular/core/testing';

import { ImpressionsService } from './impressions.service';


describe('ImpressionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpressionsService]
    });
  });

  it('should be created', inject([ImpressionsService], (service: ImpressionsService) => {
    expect(service).toBeTruthy();
  }));
});
