import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { click } from '../../../testing/utils';

import { EditIdeaFormComponent } from './edit-idea-form.component';

describe('EditIdeaFormComponent', () => {
  let component: EditIdeaFormComponent;
  let fixture: ComponentFixture<EditIdeaFormComponent>;
  let input: HTMLInputElement;

  const initialState = {
    inbox: {
      ideaToEdit: {
        id: '1',
        content: 'Edited idea',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIdeaFormComponent],
      providers: [provideMockStore({ initialState })],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIdeaFormComponent);

    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially set the input field value correctly', () => {
    expect(input.value).toBe(initialState.inbox.ideaToEdit.content);
  });

  it('should update the idea in the component', () => {
    const event = new Event('input');

    input.value = 'Test';
    input.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.editedIdeaContent).toEqual('Test');
  });

  it('should update the idea on the input field', fakeAsync(() => {
    component.editedIdeaContent = 'Test';

    fixture.detectChanges();

    tick();

    expect(input.value).toBe('Test');
  }));

  it('should submit the form when idea input is valid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('[testId="edit-idea-button"]'));
    const event = new Event('input');

    input.value = 'Test';
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton.nativeElement);

    expect(component.submitIdea).toHaveBeenCalled();
  });

  it('should not submit the form when idea input is invalid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('[testId="edit-idea-button"]'));
    const event = new Event('input');

    input.value = ' ';
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton);

    expect(component.submitIdea).not.toHaveBeenCalled();
  });

  it('should call cancelEdition method after cancel button click', () => {
    spyOn(component, 'cancelEdition');

    const submitButton = fixture.debugElement.query(By.css('[testId="cancel-edition-button"]'));

    click(submitButton);

    fixture.detectChanges();

    expect(component.cancelEdition).toHaveBeenCalled();
  });
});
