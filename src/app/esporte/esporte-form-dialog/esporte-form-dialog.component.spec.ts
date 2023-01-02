import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsporteFormDialogComponent } from './esporte-form-dialog.component';

describe('EsporteFormDialogComponent', () => {
  let component: EsporteFormDialogComponent;
  let fixture: ComponentFixture<EsporteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsporteFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsporteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
