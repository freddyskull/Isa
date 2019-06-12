import { TestBed } from '@angular/core/testing';

import { ExcelFormatsService } from './excel-formats.service';

describe('ExcelFormatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelFormatsService = TestBed.get(ExcelFormatsService);
    expect(service).toBeTruthy();
  });
});
