import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-idea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-idea-form.component.html',
  styleUrl: './edit-idea-form.component.scss'
})
export class EditIdeaFormComponent implements OnInit {
  @Input({ required: true }) idea!: string;

  @Output() editIdea = new EventEmitter<string>();

  ideaToEdit  = '';

  ngOnInit(): void {
   this.ideaToEdit = this.idea;
  }

  submitIdea() {
    if(!this.ideaToEdit.trim()) {
      return;
    }

    this.editIdea.emit(this.ideaToEdit.trim());

    this.ideaToEdit = '';
  }
}
