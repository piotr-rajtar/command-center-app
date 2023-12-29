import { Component, OnDestroy, computed, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { DropdownService } from '../shared/services/dropdown.service';

import { MENU_DROPDOWN_ID } from './const';
import { NAV_LINKS } from './nav-links';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnDestroy {
  NAV_LINKS = NAV_LINKS;

  isMobileMenuOpen = computed<boolean>(() =>
    this.dropdownService.openedDropdownId() === MENU_DROPDOWN_ID
  );

  outsideClickSubscription?: Subscription;

  constructor(private dropdownService: DropdownService) {
    effect(() => {
      if(this.isMobileMenuOpen()) {
        this.outsideClickSubscription = this.dropdownService.outsideClick$.subscribe();
      }
    })

    effect(() => {
      if(
        !this.isMobileMenuOpen() &&
        this.outsideClickSubscription &&
        !this.outsideClickSubscription.closed
      ) {
        this.outsideClickSubscription.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    if(this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }
  }

  closeMenu(event: Event) {
    this.dropdownService.closeDropdown();
    event.stopPropagation();
  }

  toggleMobileMenu(event: Event) {
    if(this.isMobileMenuOpen()) {
      this.dropdownService.closeDropdown();
    } else {
      this.dropdownService.openDropdown(MENU_DROPDOWN_ID);
    }
    event.stopPropagation();
  }
}
