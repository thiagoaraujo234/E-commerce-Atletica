import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroFormDialogComponent } from './parceiro-form-dialog.component';

describe('ParceiroFormDialogComponent', () => {
  let component: ParceiroFormDialogComponent;
  let fixture: ComponentFixture<ParceiroFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParceiroFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParceiroFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
