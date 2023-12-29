import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListComponent } from './empty-list.component';

describe('EmptyListComponent', () => {
  let component: EmptyListComponent;
  let fixture: ComponentFixture<EmptyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyListComponent);

    component = fixture.componentInstance;
    component.header = 'Test header';
    component.imageAlt = 'Test image alt';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
