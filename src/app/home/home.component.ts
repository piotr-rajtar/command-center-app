import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardListComponent } from '../shared/components/card-list/card-list.component';

import { CARDS } from './cards';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  CARDS = CARDS;

  openCard(cardUrl: string) {
    this.router.navigate([cardUrl]);
  }
}
