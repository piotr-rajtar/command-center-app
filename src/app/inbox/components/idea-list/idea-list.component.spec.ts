import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { IdeaListComponent } from './idea-list.component';

describe('IdeaListComponent', () => {
  let component: IdeaListComponent;
  let fixture: ComponentFixture<IdeaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaListComponent],
      providers: [provideMockStore()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaListComponent);

    component = fixture.componentInstance;
    component.ideas = [
      {
        id: 'test_idea_id',
        content: 'test_idea_content',
      },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
