import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCidadeDialogComponent } from './consulta-cidade-dialog.component';

describe('ConsultaCidadeDialogComponent', () => {
  let component: ConsultaCidadeDialogComponent;
  let fixture: ComponentFixture<ConsultaCidadeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCidadeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCidadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
