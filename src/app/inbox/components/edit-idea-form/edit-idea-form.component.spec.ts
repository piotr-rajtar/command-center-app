import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../../testing/utils';

import { EditIdeaFormComponent } from './edit-idea-form.component';

describe('EditIdeaFormComponent', () => {
  let component: EditIdeaFormComponent;
  let fixture: ComponentFixture<EditIdeaFormComponent>;
  let input: HTMLInputElement;

  const ideaProp = 'Idea to edit';
  const editedIdea = 'Edited idea';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIdeaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIdeaFormComponent);

    component = fixture.componentInstance;
    component.idea = ideaProp;

    input = fixture.nativeElement.querySelector('input');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially set the input field value correctly', () => {
    expect(input.value).toBe(ideaProp);
  });

  it('should initially set the component #ideaToEdit value correctly', () => {
    expect(component.ideaToEdit).toBe(ideaProp);
  });

  it('should update the idea in the component', () => {
    const event = new Event('input');

    input.value = editedIdea;
    input.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.ideaToEdit).toEqual(editedIdea);
  });

  it('should update the idea on the input field', fakeAsync(() => {
    component.ideaToEdit = editedIdea;

    fixture.detectChanges();

    tick();

    expect(input.value).toBe(editedIdea);
  }));

  it('should submit the form when idea input is valid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('#edit-idea-button'));
    const event = new Event('input');

    input.value = editedIdea;
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton.nativeElement);

    expect(component.submitIdea).toHaveBeenCalled();
  });

  it('should not submit the form when idea input is invalid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('#edit-idea-button'));
    const event = new Event('input');

    input.value = ' ';
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton.nativeElement);

    expect(component.submitIdea).not.toHaveBeenCalled();
  });
});
