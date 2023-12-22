import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropdownService } from '../../../shared/services/dropdown.service';
import { click, dropdownServiceMock } from '../../../testing/utils';

import { IdeaComponent } from './idea.component';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;
  let dropdownService: DropdownService;
  let store: MockStore;

  let actionsButtonDe: DebugElement;
  let dropdownMenuDe: DebugElement;

  const initialState = {
    inbox: {
      ideaToEdit: {
        id: '1',
        content: 'Edited idea',
      },
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: DropdownService,
          useValue: dropdownServiceMock,
        }
      ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    dropdownService = TestBed.inject(DropdownService);
    fixture = TestBed.createComponent(IdeaComponent);

    actionsButtonDe = fixture.debugElement.query(By.css('[testId="actionsButton"]'));
    dropdownMenuDe = fixture.debugElement.query(By.css('[testId="dropdownMenu"]'));

    component = fixture.componentInstance;
    component.idea = {
      id: 'test_idea_id',
      content: 'test_idea_content',
    };

    dropdownService.closeDropdown();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dropdown menu after actions button click' ,() => {
    click(actionsButtonDe.nativeElement);

    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBeTrue();
    expect(actionsButtonDe.classes['show']).toBeTrue();
    expect(dropdownMenuDe.classes['show']).toBeTrue();
  });

  it('should hide dropdown menu after actions button click, when dropdown is showed' ,() => {
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    click(actionsButtonDe.nativeElement);

    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBeFalse();
    expect(actionsButtonDe.classes['show']).toBeFalsy();
    expect(dropdownMenuDe.classes['show']).toBeFalsy();
  });

  it('should hide dropdown menu after assign option click, when dropdown is showed' ,() => {
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const assignOptionDe = fixture.debugElement.query(By.css('[testId="assignOption"]'));

    click(assignOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBeFalse();
    expect(actionsButtonDe.classes['show']).toBeFalsy();
    expect(dropdownMenuDe.classes['show']).toBeFalsy();
  });

  it('should disable actions button when idea is under edition', () => {
    spyOn(component, 'toggleDropdown');

    const actionsButtonDe = fixture.debugElement.query(By.css('[testId="actionsButton"]'));

    component.idea = {
      ...component.idea,
      id: initialState.inbox.ideaToEdit.id,
    };

    fixture.detectChanges();

    click(actionsButtonDe.nativeElement);

    expect(component.toggleDropdown).not.toHaveBeenCalled();
    expect(actionsButtonDe.attributes['disabled']).not.toBeUndefined();
  });

  it('should emit assign event after remove option click' ,() => {
    spyOn(component.assign, 'emit');
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const assignOptionDe = fixture.debugElement.query(By.css('[testId="assignOption"]'));

    click(assignOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.assign.emit).toHaveBeenCalled();
  });

  it('should not emit assign event after remove option click when idea is under edition', () => {
    spyOn(component.assign, 'emit');

    component.idea = {
      ...component.idea,
      id: initialState.inbox.ideaToEdit.id,
    };

    fixture.detectChanges();

    component.assignIdea();

    expect(component.assign.emit).not.toHaveBeenCalled();
  })

  it('should hide dropdown menu after edit option click, when dropdown is showed' ,() => {
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const editOptionDe = fixture.debugElement.query(By.css('[testId="editOption"]'));

    click(editOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBeFalse();
    expect(actionsButtonDe.classes['show']).toBeFalsy();
    expect(dropdownMenuDe.classes['show']).toBeFalsy();
  });

  it('should call editIdea method after edit option click', () => {
    spyOn(component, 'editIdea');

    const editOptionDe = fixture.debugElement.query(By.css('[testId="editOption"]'));

    fixture.detectChanges();

    click(editOptionDe.nativeElement);

    expect(component.editIdea).toHaveBeenCalled();
  })

  it('should not dispatch action to store on editIdea call when idea is under edition', () => {
    spyOn(store, 'dispatch');

    component.idea = {
      ...component.idea,
      id: initialState.inbox.ideaToEdit.id,
    };

    fixture.detectChanges();

    component.editIdea();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should hide dropdown menu after remove option click, when dropdown is showed' ,() => {
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const removeOptionDe = fixture.debugElement.query(By.css('[testId="removeOption"]'));

    click(removeOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBeFalse();
    expect(actionsButtonDe.classes['show']).toBeFalsy();
    expect(dropdownMenuDe.classes['show']).toBeFalsy();
  });

  it('should call removeIdea method after remove option click', () => {
    spyOn(component, 'removeIdea');

    const removeOptionDe = fixture.debugElement.query(By.css('[testId="removeOption"]'));

    fixture.detectChanges();

    click(removeOptionDe.nativeElement);

    expect(component.removeIdea).toHaveBeenCalled();
  })

  it('should not dispatch action to store on removeIdea call when idea is under edition', () => {
    spyOn(store, 'dispatch');

    component.idea = {
      ...component.idea,
      id: initialState.inbox.ideaToEdit.id,
    };

    fixture.detectChanges();

    component.removeIdea();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
