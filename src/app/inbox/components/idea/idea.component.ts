import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DropdownService } from '../../../shared/services/dropdown.service';
import { AppState } from '../../../typings/store';

import * as InboxActions from '../../store/inbox.actions';
import * as InboxSelectors from '../../store/inbox.selectors';
import { Idea } from '../../typings';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent implements OnDestroy, OnInit {
  @Input({ required: true }) idea!: Idea;

  @Output() assign = new EventEmitter<string>();

  private dropdownService = inject(DropdownService);
  private store = inject<Store<AppState>>(Store);

  editedIdeaId!: string;
  ideaToEditSubscription!: Subscription;
  outsideClickSubscription?: Subscription;

  isDropdownOpen = computed<boolean>(() =>
    this.dropdownService.openedDropdownId() === this.idea.id
  );

  constructor() {
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

  ngOnInit(): void {
    this.ideaToEditSubscription = this.store
      .select(InboxSelectors.selectIdeaToEdit)
      .subscribe(ideaToEdit => {
        this.editedIdeaId = ideaToEdit && ideaToEdit.id || '';
      });
  }

  ngOnDestroy(): void {
    this.dropdownService.closeDropdown();

    if(this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }

    this.ideaToEditSubscription.unsubscribe();
  }

  assignIdea() {
    if(this.isIdeaEdited) {
      return;
    }

    this.assign.emit();
    this.dropdownService.closeDropdown();
  }

  editIdea() {
    if(this.isIdeaEdited) {
      return;
    }

    this.store.dispatch(
      InboxActions.ideaActions.setIdeaToEdit({ idea: this.idea })
    );

    this.dropdownService.closeDropdown();

    window.scrollTo(0, 0);
  }

  removeIdea() {
    if(this.isIdeaEdited) {
      return;
    }

    this.store.dispatch(
      InboxActions.ideaActions.startIdeaRemoval({ ideaId: this.idea.id })
    );
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

  get isIdeaEdited(): boolean {
    return this.idea.id === this.editedIdeaId;
  }
}
