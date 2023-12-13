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
        description: 'test_description',
        title: 'test_title',
        url: 'testUrl'
      }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
