import { Injectable, signal } from '@angular/core';
import { Observable, fromEvent, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  openedDropdownId = signal<null | string>(null);

  outsideClick$!: Observable<Event>;

  constructor() {
    this.outsideClick$ = fromEvent(document, 'click')
      .pipe(
        tap(() => {
          this.openedDropdownId.set(null);
        }),
      );
  }

  openDropdown(id: string) {
    this.openedDropdownId.set(id);
  }

  closeDropdown() {
    this.openedDropdownId.set(null);
  }
}
