import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../../testing/utils'

import { ErrorAlertComponent } from './error-alert.component';

describe('ErrorAlertComponent', () => {
  let component: ErrorAlertComponent;
  let fixture: ComponentFixture<ErrorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorAlertComponent);

    component = fixture.componentInstance;
    component.message = 'Test message';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event after close button click', () => {
    spyOn(component.close, 'emit');

    const closeButtonDe = fixture.debugElement.query(By.css('button'));

    click(closeButtonDe);

    expect(component.close.emit).toHaveBeenCalled();
  });
});
