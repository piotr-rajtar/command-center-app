import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Card } from '../../typings';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input({ required: true }) card!: Card;
  @Output() openCard = new EventEmitter<void>();

  openCardClick(): void {
    this.openCard.emit();
  }
}
