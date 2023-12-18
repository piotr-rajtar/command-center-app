import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownService } from '../../../shared/services/dropdown.service';
import { click, dropdownServiceMock } from '../../../testing/utils';

import { IdeaComponent } from './idea.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;
  let dropdownService: DropdownService;

  let actionsButtonDe: DebugElement;
  let dropdownMenuDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaComponent],
      providers: [
        {
          provide: DropdownService,
          useValue: dropdownServiceMock,
        }
      ],
    })
    .compileComponents();

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

  it('should emits assign event after remove option click' ,() => {
    spyOn(component.assign, 'emit')
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const assignOptionDe = fixture.debugElement.query(By.css('[testId="assignOption"]'));

    click(assignOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.assign.emit).toHaveBeenCalled();
  });

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

  it('should emits edit event after remove option click' ,() => {
    spyOn(component.edit, 'emit')
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const editOptionDe = fixture.debugElement.query(By.css('[testId="editOption"]'));

    click(editOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.edit.emit).toHaveBeenCalled();
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

  it('should emits remove event after remove option click' ,() => {
    spyOn(component.remove, 'emit')
    component.toggleDropdown(new Event('click'));

    fixture.detectChanges();

    const removeOptionDe = fixture.debugElement.query(By.css('[testId="removeOption"]'));

    click(removeOptionDe.nativeElement);

    fixture.detectChanges();

    expect(component.remove.emit).toHaveBeenCalled();
  });
});
