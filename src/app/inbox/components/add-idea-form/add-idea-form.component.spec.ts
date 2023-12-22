import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { click } from '../../../testing/utils';

import { AddIdeaFormComponent } from './add-idea-form.component';

describe('AddIdeaFormComponent', () => {
  let component: AddIdeaFormComponent;
  let fixture: ComponentFixture<AddIdeaFormComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIdeaFormComponent],
      providers: [provideMockStore()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIdeaFormComponent);
    component = fixture.componentInstance;

    input = fixture.nativeElement.querySelector('input');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the idea in the component', () => {
    const event = new Event('input');

    input.value = 'New idea';
    input.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.idea).toEqual('New idea');
  });

  it('should update the idea on the input field', fakeAsync(() => {
    component.idea = 'New idea';

    fixture.detectChanges();

    tick();

    expect(input.value).toBe('New idea');
  }));

  it('should submit the form when idea input is valid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('#add-idea-button'));
    const event = new Event('input');

    input.value = 'New idea';
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton.nativeElement);

    expect(component.submitIdea).toHaveBeenCalled();
  });

  it('should not submit the form when idea input is invalid', () => {
    spyOn(component, 'submitIdea');

    const submitButton = fixture.debugElement.query(By.css('#add-idea-button'));
    const event = new Event('input');

    input.value = ' ';
    input.dispatchEvent(event);

    fixture.detectChanges();

    click(submitButton.nativeElement);

    expect(component.submitIdea).not.toHaveBeenCalled();
  });
});
