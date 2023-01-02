import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeFormDialogComponent } from './cidade-form-dialog.component';

describe('CidadeFormDialogComponent', () => {
  let component: CidadeFormDialogComponent;
  let fixture: ComponentFixture<CidadeFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadeFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
