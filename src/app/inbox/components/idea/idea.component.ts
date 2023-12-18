import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  computed,
  effect,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownService } from '../../../shared/services/dropdown.service';

import { Idea } from '../../typings';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent implements OnDestroy {
  @Input({ required: true }) idea!: Idea;

  @Output() assign = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  isDropdownOpen = computed<boolean>(() =>
    this.dropdownService.openedDropdownId() === this.idea.id
  );

  outsideClickSubscription?: Subscription;

  constructor(private dropdownService: DropdownService) {
    effect(() => {
      if(this.isDropdownOpen()) {
        this.outsideClickSubscription = this.dropdownService.outsideClick$.subscribe();
      }
    })

    effect(() => {
      if(
        !this.isDropdownOpen() &&
        this.outsideClickSubscription &&
        !this.outsideClickSubscription.closed
      ) {
        this.outsideClickSubscription.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    this.dropdownService.closeDropdown();

    if(this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }
  }

  assignIdea() {
    this.assign.emit();
    this.dropdownService.closeDropdown();
  }

  editIdea() {
    this.edit.emit();
    this.dropdownService.closeDropdown();
  }

  removeIdea() {
    this.remove.emit();
    this.dropdownService.closeDropdown();
  }

  toggleDropdown(event: Event) {
    if(this.isDropdownOpen()) {
      this.dropdownService.closeDropdown();
    } else {
      this.dropdownService.openDropdown(this.idea.id);
    }
    event.stopPropagation();
  }
}
