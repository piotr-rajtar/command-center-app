import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../../testing/utils';

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
      title: 'test_title',
      url: 'testUrl'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openCard event after open button click', () => {
    spyOn(component.openCard, 'emit');

    const openButtonDe = fixture.debugElement.query(By.css('[testId="openCard"]'));

    click(openButtonDe.nativeElement);

    expect(component.openCard.emit).toHaveBeenCalled();
  })
});
