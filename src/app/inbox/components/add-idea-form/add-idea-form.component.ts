import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-idea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-idea-form.component.html',
  styleUrl: './add-idea-form.component.scss'
})
export class AddIdeaFormComponent {
  @Output() addIdea = new EventEmitter<string>();

  idea = '';

  submitIdea() {
    if(!this.idea.trim()) {
      return;
    }

    this.addIdea.emit(this.idea.trim());

    this.idea = '';
  }
}
