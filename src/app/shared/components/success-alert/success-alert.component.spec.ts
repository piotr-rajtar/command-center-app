import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../../testing/utils'

import { SuccessAlertComponent } from './success-alert.component';

describe('SuccessAlertComponent', () => {
  let component: SuccessAlertComponent;
  let fixture: ComponentFixture<SuccessAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessAlertComponent);

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
