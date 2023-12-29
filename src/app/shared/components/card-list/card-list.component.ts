import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Card } from '../../typings';

import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [ CardComponent ],
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input({ required: true }) cards!: Card[];
  @Output() openCard = new EventEmitter<string>();

  openCardClick(cardUrl: string): void {
    this.openCard.emit(cardUrl);
  }
}
