import { TestBed } from '@angular/core/testing';

import { DropdownService } from './dropdown.service';

describe('DropdownService', () => {
  let service: DropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set active dropdown id correctly after dropdown open', () => {
    const testDropdownId = 'test_id';

    service.openDropdown(testDropdownId);
    expect(service.openedDropdownId()).toBe(testDropdownId);
  });

  it('should set active dropdown to null after dropdown close', () => {
    const testDropdownId = 'test_id';

    service.openDropdown(testDropdownId);
    service.closeDropdown();
    expect(service.openedDropdownId()).toBeNull();
  });
});
