import { DebugElement, signal } from '@angular/core';
import { of } from 'rxjs';

import { DropdownService } from '../shared/services/dropdown.service';

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/** Simulate element click. Defaults to mouse left-button click event. */
export const click = (
  element: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left,
): void => {
  if(element instanceof HTMLElement) {
    element.click();
  } else {
    element.triggerEventHandler('click', eventObj);
  }
}

export const dropdownServiceMock: DropdownService = {
  openedDropdownId: signal(null),
  outsideClick$: of(),
  openDropdown(id) {
    this.openedDropdownId.set(id);
  },
  closeDropdown() {
    this.openedDropdownId.set(null);
  }
}

export class DummyComponent {};
