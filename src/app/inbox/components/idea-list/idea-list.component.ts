import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Idea } from '../../typings';

import { IdeaComponent } from '../idea/idea.component';

@Component({
  selector: 'app-idea-list',
  standalone: true,
  imports: [IdeaComponent],
  templateUrl: './idea-list.component.html',
  styleUrl: './idea-list.component.scss'
})
export class IdeaListComponent {
  @Input({ required: true }) ideas!: Idea[];

  @Output() assign = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  assignIdea(ideaId: string) {
    this.assign.emit(ideaId);
  }

  editIdea(ideaId: string) {
    this.edit.emit(ideaId);
  }

  removeIdea(ideaId: string) {
    this.remove.emit(ideaId);
  }
}
