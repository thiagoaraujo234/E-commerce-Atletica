import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoFormDialogComponent } from './evento-form-dialog.component';

describe('EventoFormDialogComponent', () => {
  let component: EventoFormDialogComponent;
  let fixture: ComponentFixture<EventoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
