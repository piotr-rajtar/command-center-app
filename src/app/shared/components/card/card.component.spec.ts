import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);

    component = fixture.componentInstance;
    component.card = {
      id: 'test_id',
      description: 'test_description',
      img: 'test_img',
      title: 'test_title',
      url: 'testUrl'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
