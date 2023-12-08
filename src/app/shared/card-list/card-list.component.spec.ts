import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListComponent);

    component = fixture.componentInstance;
    component.cards = [
      {
        id: 'test_id',
        img: 'test_img',
        title: 'test_title',
        description: 'test_description'
      }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
