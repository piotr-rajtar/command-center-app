import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EmptyListComponent } from '../../../shared/components/empty-list/empty-list.component';
import { AppState } from '../../../typings/store';

import * as InboxActions from '../../store/inbox.actions';
import * as InboxSelectors from '../../store/inbox.selectors';
import { Idea } from '../../typings';

import { AddIdeaFormComponent } from '../add-idea-form/add-idea-form.component';
import { EditIdeaFormComponent } from '../edit-idea-form/edit-idea-form.component';
import { IdeaListComponent } from '../idea-list/idea-list.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    CommonModule,
    AddIdeaFormComponent,
    EditIdeaFormComponent,
    EmptyListComponent,
    IdeaListComponent,
  ],
  templateUrl: './inbox-container.component.html',
  styleUrl: './inbox-container.component.scss'
})
export class InboxContainerComponent implements OnDestroy, OnInit {
  private store = inject<Store<AppState>>(Store);

  ideas$!: Observable<Idea[]>
  isEditMode$!: Observable<boolean>;

  ngOnInit(): void {
    this.ideas$ = this.store.select(InboxSelectors.selectIdeas);
    this.isEditMode$ = this.store.select(InboxSelectors.selectIsEditMode);
  }

  ngOnDestroy(): void {
    this.store.dispatch(InboxActions.stopEditMode());
  }

  assignIdea(ideaId: string) {
    //TODO: handle idea assignment
  }
}
